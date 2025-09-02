import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Vaults_Update: AppBlock = {
  name: "Vaults / Update",
  description: "Update a key vault in the specified subscription.",
  category: "Vaults",
  inputs: {
    default: {
      config: {
        vaultName: {
          name: "Vault Name",
          description: "Name of the vault",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              tags: {
                type: "object",
                additionalProperties: true,
              },
              properties: {
                type: "object",
                properties: {
                  tenantId: {
                    type: "string",
                  },
                  sku: {
                    type: "object",
                    properties: {
                      family: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                    },
                    required: ["name", "family"],
                  },
                  accessPolicies: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        tenantId: {
                          type: "string",
                        },
                        objectId: {
                          type: "string",
                        },
                        applicationId: {
                          type: "string",
                        },
                        permissions: {
                          type: "object",
                          properties: {
                            keys: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            secrets: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            certificates: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            storage: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                      required: ["tenantId", "objectId", "permissions"],
                    },
                  },
                  enabledForDeployment: {
                    type: "boolean",
                  },
                  enabledForDiskEncryption: {
                    type: "boolean",
                  },
                  enabledForTemplateDeployment: {
                    type: "boolean",
                  },
                  enableSoftDelete: {
                    type: "boolean",
                  },
                  enableRbacAuthorization: {
                    type: "boolean",
                  },
                  softDeleteRetentionInDays: {
                    type: "number",
                  },
                  createMode: {
                    type: "string",
                  },
                  enablePurgeProtection: {
                    type: "boolean",
                  },
                  networkAcls: {
                    type: "object",
                    properties: {
                      bypass: {
                        type: "string",
                      },
                      defaultAction: {
                        type: "string",
                      },
                      ipRules: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            value: {
                              type: "string",
                            },
                          },
                          required: ["value"],
                        },
                      },
                      virtualNetworkRules: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            ignoreMissingVnetServiceEndpoint: {
                              type: "boolean",
                            },
                          },
                          required: ["id"],
                        },
                      },
                    },
                  },
                  publicNetworkAccess: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.KeyVault/vaults/${input.event.inputConfig.vaultName}` +
          "?api-version=2023-07-01";

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
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          type: {
            type: "string",
          },
          location: {
            type: "string",
          },
          tags: {
            type: "object",
            additionalProperties: true,
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
              tenantId: {
                type: "string",
              },
              sku: {
                type: "object",
                properties: {
                  family: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                },
                required: ["name", "family"],
              },
              accessPolicies: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    tenantId: {
                      type: "string",
                    },
                    objectId: {
                      type: "string",
                    },
                    applicationId: {
                      type: "string",
                    },
                    permissions: {
                      type: "object",
                      properties: {
                        keys: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        secrets: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        certificates: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        storage: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                  required: ["tenantId", "objectId", "permissions"],
                },
              },
              vaultUri: {
                type: "string",
              },
              hsmPoolResourceId: {
                type: "string",
              },
              enabledForDeployment: {
                type: "boolean",
              },
              enabledForDiskEncryption: {
                type: "boolean",
              },
              enabledForTemplateDeployment: {
                type: "boolean",
              },
              enableSoftDelete: {
                type: "boolean",
              },
              softDeleteRetentionInDays: {
                type: "integer",
              },
              enableRbacAuthorization: {
                type: "boolean",
              },
              createMode: {
                type: "string",
              },
              enablePurgeProtection: {
                type: "boolean",
              },
              networkAcls: {
                type: "object",
                properties: {
                  bypass: {
                    type: "string",
                  },
                  defaultAction: {
                    type: "string",
                  },
                  ipRules: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        value: {
                          type: "string",
                        },
                      },
                      required: ["value"],
                    },
                  },
                  virtualNetworkRules: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        ignoreMissingVnetServiceEndpoint: {
                          type: "boolean",
                        },
                      },
                      required: ["id"],
                    },
                  },
                },
              },
              provisioningState: {
                type: "string",
              },
              privateEndpointConnections: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    etag: {
                      type: "string",
                    },
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
            },
            required: ["tenantId", "sku"],
          },
        },
        required: ["properties"],
      },
    },
  },
};

export default Vaults_Update;
