import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DiskEncryptionSets_ListByResourceGroup: AppBlock = {
  name: "Disk Encryption Sets / List By Resource Group",
  description: "Lists all the disk encryption sets under a resource group.",
  category: "Disk Encryption Sets",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets` +
          "?api-version=2025-01-02";

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
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default DiskEncryptionSets_ListByResourceGroup;
