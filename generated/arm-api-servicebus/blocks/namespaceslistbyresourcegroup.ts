import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Namespaces_ListByResourceGroup: AppBlock = {
  name: "Namespaces / List By Resource Group",
  description: "Gets the available namespaces within a resource group.",
  category: "Namespaces",
  inputs: {
    default: {
      config: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ServiceBus/namespaces` +
          "?api-version=2024-01-01";

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
                                type: "object",
                                additionalProperties: true,
                              },
                              createdByType: {
                                type: "object",
                                additionalProperties: true,
                              },
                              createdAt: {
                                type: "object",
                                additionalProperties: true,
                              },
                              lastModifiedBy: {
                                type: "object",
                                additionalProperties: true,
                              },
                              lastModifiedByType: {
                                type: "object",
                                additionalProperties: true,
                              },
                              lastModifiedAt: {
                                type: "object",
                                additionalProperties: true,
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Namespaces_ListByResourceGroup;
