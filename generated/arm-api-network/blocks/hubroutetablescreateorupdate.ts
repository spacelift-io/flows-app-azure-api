import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const HubRouteTables_CreateOrUpdate: AppBlock = {
  name: "Hub Route Tables / Create Or Update",
  description:
    "Creates a RouteTable resource if it doesn't exist else updates the existing RouteTable.",
  category: "Hub Route Tables",
  inputs: {
    default: {
      config: {
        virtualHubName: {
          name: "Virtual Hub Name",
          description: "Name of the virtual hub",
          type: "string",
          required: true,
        },
        routeTableName: {
          name: "Route Table Name",
          description: "Name of the route table",
          type: "string",
          required: true,
        },
        routeTableParameters: {
          name: "Route Table Parameters",
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
        const requestBody = input.event.inputConfig.routeTableParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualHubs/${input.event.inputConfig.virtualHubName}/hubRouteTables/${input.event.inputConfig.routeTableName}` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
          requestBody,
          undefined,
          input.event.inputConfig.isBinaryData || false,
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
          properties: {
            type: "object",
            properties: {
              routes: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    destinationType: {
                      type: "string",
                    },
                    destinations: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    nextHopType: {
                      type: "string",
                    },
                    nextHop: {
                      type: "string",
                    },
                  },
                  required: [
                    "name",
                    "destinationType",
                    "destinations",
                    "nextHopType",
                    "nextHop",
                  ],
                },
              },
              labels: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              associatedConnections: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              propagatingConnections: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              provisioningState: {
                type: "string",
              },
            },
          },
          name: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          type: {
            type: "string",
          },
        },
      },
    },
  },
};

export default HubRouteTables_CreateOrUpdate;
