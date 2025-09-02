import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DiskEncryptionSets_CreateOrUpdate: AppBlock = {
  name: "Disk Encryption Sets / Create Or Update",
  description: "Creates or updates a disk encryption set",
  category: "Disk Encryption Sets",
  inputs: {
    default: {
      config: {
        diskEncryptionSetName: {
          name: "Disk Encryption Set Name",
          description: "Name of the disk encryption set",
          type: "string",
          required: true,
        },
        diskEncryptionSet: {
          name: "Disk Encryption Set",
          description:
            "disk encryption set object supplied in the body of the Put disk encryption set operation.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  encryptionType: {
                    type: "string",
                  },
                  activeKey: {
                    type: "object",
                    properties: {
                      sourceVault: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                        },
                      },
                      keyUrl: {
                        type: "string",
                      },
                    },
                    required: ["keyUrl"],
                  },
                  previousKeys: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        sourceVault: {
                          type: "object",
                          additionalProperties: true,
                        },
                        keyUrl: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                      required: ["keyUrl"],
                    },
                  },
                  provisioningState: {
                    type: "string",
                  },
                  rotationToLatestKeyVersionEnabled: {
                    type: "boolean",
                  },
                  lastKeyRotationTimestamp: {
                    type: "string",
                  },
                  autoKeyRotationError: {
                    type: "object",
                    properties: {
                      details: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            code: {
                              type: "string",
                            },
                            target: {
                              type: "string",
                            },
                            message: {
                              type: "string",
                            },
                          },
                        },
                      },
                      innererror: {
                        type: "object",
                        properties: {
                          exceptiontype: {
                            type: "string",
                          },
                          errordetail: {
                            type: "string",
                          },
                        },
                      },
                      code: {
                        type: "string",
                      },
                      target: {
                        type: "string",
                      },
                      message: {
                        type: "string",
                      },
                    },
                  },
                  federatedClientId: {
                    type: "string",
                  },
                },
              },
              identity: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                  },
                  principalId: {
                    type: "string",
                  },
                  tenantId: {
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
        const requestBody = input.event.inputConfig.diskEncryptionSet;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/${input.event.inputConfig.diskEncryptionSetName}` +
          "?api-version=2025-01-02";

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
              encryptionType: {
                type: "string",
              },
              activeKey: {
                type: "object",
                properties: {
                  sourceVault: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                    },
                  },
                  keyUrl: {
                    type: "string",
                  },
                },
                required: ["keyUrl"],
              },
              previousKeys: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    sourceVault: {
                      type: "object",
                      additionalProperties: true,
                    },
                    keyUrl: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  required: ["keyUrl"],
                },
              },
              provisioningState: {
                type: "string",
              },
              rotationToLatestKeyVersionEnabled: {
                type: "boolean",
              },
              lastKeyRotationTimestamp: {
                type: "string",
              },
              autoKeyRotationError: {
                type: "object",
                properties: {
                  details: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                        },
                        target: {
                          type: "string",
                        },
                        message: {
                          type: "string",
                        },
                      },
                    },
                  },
                  innererror: {
                    type: "object",
                    properties: {
                      exceptiontype: {
                        type: "string",
                      },
                      errordetail: {
                        type: "string",
                      },
                    },
                  },
                  code: {
                    type: "string",
                  },
                  target: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                },
              },
              federatedClientId: {
                type: "string",
              },
            },
          },
          identity: {
            type: "object",
            properties: {
              type: {
                type: "string",
              },
              principalId: {
                type: "string",
              },
              tenantId: {
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
    },
  },
};

export default DiskEncryptionSets_CreateOrUpdate;
