import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ServerTrustGroups_CreateOrUpdate: AppBlock = {
  name: "Server Trust Groups / Create Or Update",
  description: "Creates or updates a server trust group.",
  category: "Server Trust Groups",
  inputs: {
    default: {
      config: {
        locationName: {
          name: "Location Name",
          description: "Name of the location",
          type: "string",
          required: true,
        },
        serverTrustGroupName: {
          name: "Server Trust Group Name",
          description: "Name of the server trust group",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  groupMembers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        serverId: {
                          type: "string",
                        },
                      },
                      required: ["serverId"],
                    },
                  },
                  trustScopes: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: ["groupMembers", "trustScopes"],
              },
            },
          },
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/locations/${input.event.inputConfig.locationName}/serverTrustGroups/${input.event.inputConfig.serverTrustGroupName}` +
          "?api-version=2023-08-01";

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
              groupMembers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    serverId: {
                      type: "string",
                    },
                  },
                  required: ["serverId"],
                },
              },
              trustScopes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: ["groupMembers", "trustScopes"],
          },
        },
      },
    },
  },
};

export default ServerTrustGroups_CreateOrUpdate;
