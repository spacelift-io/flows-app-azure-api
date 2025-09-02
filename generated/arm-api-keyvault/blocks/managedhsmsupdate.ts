import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedHsms_Update: AppBlock = {
  name: "Managed Hsms / Update",
  description: "Update a managed HSM Pool in the specified subscription.",
  category: "Managed Hsms",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
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
                  tenantId: {
                    type: "string",
                  },
                  initialAdminObjectIds: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  hsmUri: {
                    type: "string",
                  },
                  enableSoftDelete: {
                    type: "boolean",
                  },
                  softDeleteRetentionInDays: {
                    type: "number",
                  },
                  enablePurgeProtection: {
                    type: "boolean",
                  },
                  createMode: {
                    type: "string",
                  },
                  statusMessage: {
                    type: "string",
                  },
                  provisioningState: {
                    type: "string",
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
                          },
                          required: ["id"],
                        },
                      },
                    },
                  },
                  regions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        provisioningState: {
                          type: "string",
                        },
                        isPrimary: {
                          type: "boolean",
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
                  scheduledPurgeDate: {
                    type: "string",
                  },
                  securityDomainProperties: {
                    type: "object",
                    properties: {
                      activationStatus: {
                        type: "string",
                      },
                      activationStatusMessage: {
                        type: "string",
                      },
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.KeyVault/managedHSMs/${input.event.inputConfig.name}` +
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
          properties: {
            type: "object",
            properties: {
              tenantId: {
                type: "string",
              },
              initialAdminObjectIds: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              hsmUri: {
                type: "string",
              },
              enableSoftDelete: {
                type: "boolean",
              },
              softDeleteRetentionInDays: {
                type: "integer",
              },
              enablePurgeProtection: {
                type: "boolean",
              },
              createMode: {
                type: "string",
              },
              statusMessage: {
                type: "string",
              },
              provisioningState: {
                type: "string",
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
                      },
                      required: ["id"],
                    },
                  },
                },
              },
              regions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    provisioningState: {
                      type: "string",
                    },
                    isPrimary: {
                      type: "boolean",
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
              scheduledPurgeDate: {
                type: "string",
              },
              securityDomainProperties: {
                type: "object",
                properties: {
                  activationStatus: {
                    type: "string",
                  },
                  activationStatusMessage: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default ManagedHsms_Update;
