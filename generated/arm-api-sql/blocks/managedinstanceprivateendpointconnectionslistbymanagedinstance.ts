import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedInstancePrivateEndpointConnections_ListByManagedInstance: AppBlock =
  {
    name: "Managed Instance Private Endpoint Connections / List By Managed Instance",
    description: "Gets all private endpoint connections on a server.",
    category: "Managed Instance Private Endpoint Connections",
    inputs: {
      default: {
        config: {
          managedInstanceName: {
            name: "Managed Instance Name",
            description: "Name of the managed instance",
            type: "string",
            required: true,
          },
          subscriptionId: {
            name: "Subscription ID",
            description:
              "Azure subscription ID (optional, falls back to app-level default if not provided)",
            type: "string",
            required: false,
          },
          resourceGroupName: {
            name: "Resource Group Name",
            description:
              "Azure resource group name (optional, falls back to app-level default if not provided)",
            type: "string",
            required: false,
          },
        },
        onEvent: async (input) => {
          const url =
            `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/privateEndpointConnections` +
            "?api-version=2023-08-01";

          const result = await makeAzureRequest(
            input,
            url,
            "GET",
            undefined,
            undefined,
            false,
          );
          await events.emit(result || {});
        },
      },
    },
    outputs: {
      default: {
        possiblePrimaryParents: ["default"],
        type: {
          type: "object",
          properties: {
            value: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  properties: {
                    type: "object",
                    properties: {
                      privateEndpoint: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                        },
                      },
                      privateLinkServiceConnectionState: {
                        type: "object",
                        properties: {
                          status: {
                            type: "string",
                          },
                          description: {
                            type: "string",
                          },
                          actionsRequired: {
                            type: "string",
                          },
                        },
                        required: ["status", "description"],
                      },
                      provisioningState: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
            nextLink: {
              type: "string",
            },
          },
        },
      },
    },
  };

export default ManagedInstancePrivateEndpointConnections_ListByManagedInstance;
