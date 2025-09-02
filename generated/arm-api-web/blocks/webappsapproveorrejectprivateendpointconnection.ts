import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_ApproveOrRejectPrivateEndpointConnection: AppBlock = {
  name: "Web Apps / Approve Or Reject Private Endpoint Connection",
  description:
    "Description for Approves or rejects a private endpoint connection",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        privateEndpointConnectionName: {
          name: "Private Endpoint Connection Name",
          description: "Name of the private endpoint connection",
          type: "string",
          required: true,
        },
        privateEndpointWrapper: {
          name: "Private Endpoint Wrapper",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  provisioningState: {
                    type: "string",
                  },
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
                  },
                  ipAddresses: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
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
        const requestBody = input.event.inputConfig.privateEndpointWrapper;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/privateEndpointConnections/${input.event.inputConfig.privateEndpointConnectionName}` +
          "?api-version=2024-11-01";

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
              provisioningState: {
                type: "string",
              },
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
              },
              ipAddresses: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_ApproveOrRejectPrivateEndpointConnection;
