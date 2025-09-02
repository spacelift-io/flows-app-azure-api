import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const BlobContainers_Update: AppBlock = {
  name: "Blob Containers / Update",
  description:
    "Updates container properties as specified in request body. Properties not mentioned in the request will be unchanged. Update fails if the specified container doesn't already exist.",
  category: "Blob Containers",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        containerName: {
          name: "Container Name",
          description: "Name of the container",
          type: "string",
          required: true,
        },
        blobContainer: {
          name: "Blob Container",
          description: "Properties to update for the blob container.",
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
        const requestBody = input.event.inputConfig.blobContainer;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/blobServices/default/containers/${input.event.inputConfig.containerName}` +
          "?api-version=2025-01-01";

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
              version: {
                type: "string",
              },
              deleted: {
                type: "boolean",
              },
              deletedTime: {
                type: "string",
              },
              remainingRetentionDays: {
                type: "integer",
              },
              defaultEncryptionScope: {
                type: "string",
              },
              denyEncryptionScopeOverride: {
                type: "boolean",
              },
              publicAccess: {
                type: "string",
              },
              lastModifiedTime: {
                type: "string",
              },
              leaseStatus: {
                type: "string",
              },
              leaseState: {
                type: "string",
              },
              leaseDuration: {
                type: "string",
              },
              metadata: {
                type: "object",
                additionalProperties: true,
              },
              immutabilityPolicy: {
                type: "object",
                properties: {
                  properties: {
                    type: "object",
                    properties: {
                      immutabilityPeriodSinceCreationInDays: {
                        type: "integer",
                      },
                      state: {
                        type: "string",
                      },
                      allowProtectedAppendWrites: {
                        type: "boolean",
                      },
                      allowProtectedAppendWritesAll: {
                        type: "boolean",
                      },
                    },
                  },
                  etag: {
                    type: "string",
                  },
                  updateHistory: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        update: {
                          type: "string",
                        },
                        immutabilityPeriodSinceCreationInDays: {
                          type: "integer",
                        },
                        timestamp: {
                          type: "string",
                        },
                        objectIdentifier: {
                          type: "string",
                        },
                        tenantId: {
                          type: "string",
                        },
                        upn: {
                          type: "string",
                        },
                        allowProtectedAppendWrites: {
                          type: "boolean",
                        },
                        allowProtectedAppendWritesAll: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                },
              },
              legalHold: {
                type: "object",
                properties: {
                  hasLegalHold: {
                    type: "boolean",
                  },
                  tags: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        tag: {
                          type: "string",
                        },
                        timestamp: {
                          type: "string",
                        },
                        objectIdentifier: {
                          type: "string",
                        },
                        tenantId: {
                          type: "string",
                        },
                        upn: {
                          type: "string",
                        },
                      },
                    },
                  },
                  protectedAppendWritesHistory: {
                    type: "object",
                    properties: {
                      allowProtectedAppendWritesAll: {
                        type: "boolean",
                      },
                      timestamp: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              hasLegalHold: {
                type: "boolean",
              },
              hasImmutabilityPolicy: {
                type: "boolean",
              },
              immutableStorageWithVersioning: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  timeStamp: {
                    type: "string",
                  },
                  migrationState: {
                    type: "string",
                  },
                },
              },
              enableNfsV3RootSquash: {
                type: "boolean",
              },
              enableNfsV3AllSquash: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
  },
};

export default BlobContainers_Update;
