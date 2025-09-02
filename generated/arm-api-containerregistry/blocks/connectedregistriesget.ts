import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ConnectedRegistries_Get: AppBlock = {
  name: "Connected Registries / Get",
  description: "Gets the properties of the connected registry.",
  category: "Connected Registries",
  inputs: {
    default: {
      config: {
        registryName: {
          name: "Registry Name",
          description: "Name of the registry",
          type: "string",
          required: true,
        },
        connectedRegistryName: {
          name: "Connected Registry Name",
          description: "Name of the connected registry",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/${input.event.inputConfig.registryName}/connectedRegistries/${input.event.inputConfig.connectedRegistryName}` +
          "?api-version=2025-04-01";

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
          properties: {
            type: "object",
            properties: {
              provisioningState: {
                type: "string",
              },
              mode: {
                type: "string",
              },
              version: {
                type: "string",
              },
              connectionState: {
                type: "string",
              },
              lastActivityTime: {
                type: "string",
              },
              activation: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                  },
                },
              },
              parent: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  syncProperties: {
                    type: "object",
                    properties: {
                      tokenId: {
                        type: "string",
                      },
                      schedule: {
                        type: "string",
                      },
                      syncWindow: {
                        type: "string",
                      },
                      messageTtl: {
                        type: "string",
                      },
                      lastSyncTime: {
                        type: "string",
                      },
                      gatewayEndpoint: {
                        type: "string",
                      },
                    },
                    required: ["tokenId", "messageTtl"],
                  },
                },
                required: ["syncProperties"],
              },
              clientTokenIds: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              loginServer: {
                type: "object",
                properties: {
                  host: {
                    type: "string",
                  },
                  tls: {
                    type: "object",
                    properties: {
                      status: {
                        type: "string",
                      },
                      certificate: {
                        type: "object",
                        properties: {
                          type: {
                            type: "string",
                          },
                          location: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                },
              },
              logging: {
                type: "object",
                properties: {
                  logLevel: {
                    type: "string",
                  },
                  auditLogStatus: {
                    type: "string",
                  },
                },
              },
              statusDetails: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                    },
                    code: {
                      type: "string",
                    },
                    description: {
                      type: "string",
                    },
                    timestamp: {
                      type: "string",
                    },
                    correlationId: {
                      type: "string",
                    },
                  },
                },
              },
              notificationsList: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              garbageCollection: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  schedule: {
                    type: "string",
                  },
                },
              },
            },
            required: ["mode", "parent"],
          },
        },
      },
    },
  },
};

export default ConnectedRegistries_Get;
