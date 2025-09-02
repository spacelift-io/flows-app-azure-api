import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Registries_Get: AppBlock = {
  name: "Registries / Get",
  description: "Gets the properties of the specified container registry.",
  category: "Registries",
  inputs: {
    default: {
      config: {
        registryName: {
          name: "Registry Name",
          description: "Name of the registry",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/${input.event.inputConfig.registryName}` +
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
          sku: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              tier: {
                type: "string",
              },
            },
            required: ["name"],
          },
          identity: {
            type: "object",
            properties: {
              principalId: {
                type: "string",
              },
              tenantId: {
                type: "string",
              },
              type: {
                type: "string",
              },
              userAssignedIdentities: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
          properties: {
            type: "object",
            properties: {
              loginServer: {
                type: "string",
              },
              creationDate: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
              status: {
                type: "object",
                properties: {
                  displayStatus: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                  timestamp: {
                    type: "string",
                  },
                },
              },
              adminUserEnabled: {
                type: "boolean",
              },
              networkRuleSet: {
                type: "object",
                properties: {
                  defaultAction: {
                    type: "string",
                  },
                  ipRules: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        action: {
                          type: "string",
                        },
                        value: {
                          type: "string",
                        },
                      },
                      required: ["value"],
                    },
                  },
                },
                required: ["defaultAction"],
              },
              policies: {
                type: "object",
                properties: {
                  quarantinePolicy: {
                    type: "object",
                    properties: {
                      status: {
                        type: "string",
                      },
                    },
                  },
                  trustPolicy: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                      },
                      status: {
                        type: "string",
                      },
                    },
                  },
                  retentionPolicy: {
                    type: "object",
                    properties: {
                      days: {
                        type: "integer",
                      },
                      lastUpdatedTime: {
                        type: "string",
                      },
                      status: {
                        type: "string",
                      },
                    },
                  },
                  exportPolicy: {
                    type: "object",
                    properties: {
                      status: {
                        type: "string",
                      },
                    },
                  },
                  azureADAuthenticationAsArmPolicy: {
                    type: "object",
                    properties: {
                      status: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              encryption: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                  },
                  keyVaultProperties: {
                    type: "object",
                    properties: {
                      keyIdentifier: {
                        type: "string",
                      },
                      versionedKeyIdentifier: {
                        type: "string",
                      },
                      identity: {
                        type: "string",
                      },
                      keyRotationEnabled: {
                        type: "boolean",
                      },
                      lastKeyRotationTimestamp: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              dataEndpointEnabled: {
                type: "boolean",
              },
              dataEndpointHostNames: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              privateEndpointConnections: {
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
                        },
                        provisioningState: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              publicNetworkAccess: {
                type: "string",
              },
              networkRuleBypassOptions: {
                type: "string",
              },
              zoneRedundancy: {
                type: "string",
              },
              anonymousPullEnabled: {
                type: "boolean",
              },
            },
          },
        },
        required: ["sku"],
      },
    },
  },
};

export default Registries_Get;
