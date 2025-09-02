import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ConfigurationStores_Create: AppBlock = {
  name: "Configuration Stores / Create",
  description: "Creates a configuration store with the specified parameters.",
  category: "Configuration Stores",
  inputs: {
    default: {
      config: {
        configStoreName: {
          name: "Config Store Name",
          description: "Name of the config store",
          type: "string",
          required: true,
        },
        configStoreCreationParameters: {
          name: "Config Store Creation Parameters",
          type: {
            type: "object",
            properties: {
              identity: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                  },
                  userAssignedIdentities: {
                    type: "object",
                    additionalProperties: true,
                  },
                  principalId: {
                    type: "string",
                  },
                  tenantId: {
                    type: "string",
                  },
                },
              },
              properties: {
                type: "object",
                properties: {
                  provisioningState: {
                    type: "string",
                  },
                  creationDate: {
                    type: "string",
                  },
                  endpoint: {
                    type: "string",
                  },
                  encryption: {
                    type: "object",
                    properties: {
                      keyVaultProperties: {
                        type: "object",
                        properties: {
                          keyIdentifier: {
                            type: "string",
                          },
                          identityClientId: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                  privateEndpointConnections: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        name: {
                          type: "string",
                        },
                        type: {
                          type: "string",
                        },
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
                          },
                          required: ["privateLinkServiceConnectionState"],
                        },
                      },
                    },
                  },
                  publicNetworkAccess: {
                    type: "string",
                  },
                  disableLocalAuth: {
                    type: "boolean",
                  },
                  softDeleteRetentionInDays: {
                    type: "number",
                  },
                  defaultKeyValueRevisionRetentionPeriodInSeconds: {
                    type: "number",
                  },
                  enablePurgeProtection: {
                    type: "boolean",
                  },
                  dataPlaneProxy: {
                    type: "object",
                    properties: {
                      authenticationMode: {
                        type: "string",
                      },
                      privateLinkDelegation: {
                        type: "string",
                      },
                    },
                  },
                  createMode: {
                    type: "string",
                  },
                },
              },
              sku: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                },
                required: ["name"],
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
            required: ["location", "sku"],
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
        const requestBody =
          input.event.inputConfig.configStoreCreationParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/${input.event.inputConfig.configStoreName}` +
          "?api-version=2024-06-01";

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
          identity: {
            type: "object",
            properties: {
              type: {
                type: "string",
              },
              userAssignedIdentities: {
                type: "object",
                additionalProperties: true,
              },
              principalId: {
                type: "string",
              },
              tenantId: {
                type: "string",
              },
            },
          },
          properties: {
            type: "object",
            properties: {
              provisioningState: {
                type: "string",
              },
              creationDate: {
                type: "string",
              },
              endpoint: {
                type: "string",
              },
              encryption: {
                type: "object",
                properties: {
                  keyVaultProperties: {
                    type: "object",
                    properties: {
                      keyIdentifier: {
                        type: "string",
                      },
                      identityClientId: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              privateEndpointConnections: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    name: {
                      type: "string",
                    },
                    type: {
                      type: "string",
                    },
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
                      },
                      required: ["privateLinkServiceConnectionState"],
                    },
                  },
                },
              },
              publicNetworkAccess: {
                type: "string",
              },
              disableLocalAuth: {
                type: "boolean",
              },
              softDeleteRetentionInDays: {
                type: "integer",
              },
              defaultKeyValueRevisionRetentionPeriodInSeconds: {
                type: "integer",
              },
              enablePurgeProtection: {
                type: "boolean",
              },
              dataPlaneProxy: {
                type: "object",
                properties: {
                  authenticationMode: {
                    type: "string",
                  },
                  privateLinkDelegation: {
                    type: "string",
                  },
                },
              },
              createMode: {
                type: "string",
              },
            },
          },
          sku: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
            },
            required: ["name"],
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
        required: ["location", "sku"],
      },
    },
  },
};

export default ConfigurationStores_Create;
