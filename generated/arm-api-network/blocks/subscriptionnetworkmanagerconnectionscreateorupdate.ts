import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SubscriptionNetworkManagerConnections_CreateOrUpdate: AppBlock = {
  name: "Subscription Network Manager Connections / Create Or Update",
  description: "Create a network manager connection on this subscription.",
  category: "Subscription Network Manager Connections",
  inputs: {
    default: {
      config: {
        networkManagerConnectionName: {
          name: "Network Manager Connection Name",
          description: "Name of the network manager connection",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Network manager connection to be created/updated.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  networkManagerId: {
                    type: "string",
                  },
                  connectionState: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                },
              },
              etag: {
                type: "string",
              },
              systemData: {
                type: "object",
                properties: {
                  createdBy: {
                    type: "string",
                  },
                  createdByType: {
                    type: "string",
                  },
                  createdAt: {
                    type: "string",
                  },
                  lastModifiedBy: {
                    type: "string",
                  },
                  lastModifiedByType: {
                    type: "string",
                  },
                  lastModifiedAt: {
                    type: "string",
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
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/networkManagerConnections/${input.event.inputConfig.networkManagerConnectionName}` +
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
              networkManagerId: {
                type: "string",
              },
              connectionState: {
                type: "string",
              },
              description: {
                type: "string",
              },
            },
          },
          etag: {
            type: "string",
          },
          systemData: {
            type: "object",
            properties: {
              createdBy: {
                type: "string",
              },
              createdByType: {
                type: "string",
              },
              createdAt: {
                type: "string",
              },
              lastModifiedBy: {
                type: "string",
              },
              lastModifiedByType: {
                type: "string",
              },
              lastModifiedAt: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default SubscriptionNetworkManagerConnections_CreateOrUpdate;
