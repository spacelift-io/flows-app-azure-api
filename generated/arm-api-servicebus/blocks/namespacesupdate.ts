import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Namespaces_Update: AppBlock = {
  name: "Namespaces / Update",
  description:
    "Updates a service namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent.",
  category: "Namespaces",
  inputs: {
    default: {
      config: {
        namespaceName: {
          name: "Namespace Name",
          description: "Name of the namespace",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
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
                  capacity: {
                    type: "number",
                  },
                },
                required: ["name"],
              },
              properties: {
                type: "object",
                properties: {
                  provisioningState: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  createdAt: {
                    type: "string",
                  },
                  updatedAt: {
                    type: "string",
                  },
                  serviceBusEndpoint: {
                    type: "string",
                  },
                  metricId: {
                    type: "string",
                  },
                  encryption: {
                    type: "object",
                    properties: {
                      keyVaultProperties: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            keyName: {
                              type: "string",
                            },
                            keyVaultUri: {
                              type: "string",
                            },
                            keyVersion: {
                              type: "string",
                            },
                            identity: {
                              type: "object",
                              properties: {
                                userAssignedIdentity: {
                                  type: "string",
                                },
                              },
                            },
                          },
                        },
                      },
                      keySource: {
                        type: "string",
                      },
                      requireInfrastructureEncryption: {
                        type: "boolean",
                      },
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
                              },
                            },
                            provisioningState: {
                              type: "string",
                            },
                          },
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
                  disableLocalAuth: {
                    type: "boolean",
                  },
                  alternateName: {
                    type: "string",
                  },
                },
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${input.event.inputConfig.namespaceName}` +
          "?api-version=2024-01-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
          sku: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              tier: {
                type: "string",
              },
              capacity: {
                type: "integer",
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
          properties: {
            type: "object",
            properties: {
              minimumTlsVersion: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
              status: {
                type: "string",
              },
              createdAt: {
                type: "string",
              },
              updatedAt: {
                type: "string",
              },
              serviceBusEndpoint: {
                type: "string",
              },
              metricId: {
                type: "string",
              },
              zoneRedundant: {
                type: "boolean",
              },
              encryption: {
                type: "object",
                properties: {
                  keyVaultProperties: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        keyName: {
                          type: "string",
                        },
                        keyVaultUri: {
                          type: "string",
                        },
                        keyVersion: {
                          type: "string",
                        },
                        identity: {
                          type: "object",
                          properties: {
                            userAssignedIdentity: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                  keySource: {
                    type: "string",
                  },
                  requireInfrastructureEncryption: {
                    type: "boolean",
                  },
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
                          },
                        },
                        provisioningState: {
                          type: "string",
                        },
                      },
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
              disableLocalAuth: {
                type: "boolean",
              },
              alternateName: {
                type: "string",
              },
              publicNetworkAccess: {
                type: "string",
              },
              premiumMessagingPartitions: {
                type: "integer",
              },
            },
          },
        },
      },
    },
  },
};

export default Namespaces_Update;
