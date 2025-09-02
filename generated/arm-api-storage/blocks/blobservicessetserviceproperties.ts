import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const BlobServices_SetServiceProperties: AppBlock = {
  name: "Blob Services / Set Service Properties",
  description:
    "Sets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.",
  category: "Blob Services",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        BlobServicesName: {
          name: "Blob Services Name",
          description: "Name of the blob services",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description:
            "The properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.",
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/blobServices/${input.event.inputConfig.BlobServicesName}` +
          "?api-version=2025-01-01";

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
              cors: {
                type: "object",
                properties: {
                  corsRules: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        allowedOrigins: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        allowedMethods: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        maxAgeInSeconds: {
                          type: "integer",
                        },
                        exposedHeaders: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        allowedHeaders: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                      },
                      required: [
                        "allowedOrigins",
                        "allowedMethods",
                        "maxAgeInSeconds",
                        "exposedHeaders",
                        "allowedHeaders",
                      ],
                    },
                  },
                },
              },
              defaultServiceVersion: {
                type: "string",
              },
              deleteRetentionPolicy: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  days: {
                    type: "integer",
                  },
                  allowPermanentDelete: {
                    type: "boolean",
                  },
                },
              },
              isVersioningEnabled: {
                type: "boolean",
              },
              automaticSnapshotPolicyEnabled: {
                type: "boolean",
              },
              changeFeed: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  retentionInDays: {
                    type: "integer",
                  },
                },
              },
              restorePolicy: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  days: {
                    type: "integer",
                  },
                  lastEnabledTime: {
                    type: "string",
                  },
                  minRestoreTime: {
                    type: "string",
                  },
                },
                required: ["enabled"],
              },
              containerDeleteRetentionPolicy: {
                type: "object",
                properties: {
                  enabled: {
                    type: "object",
                    additionalProperties: true,
                  },
                  days: {
                    type: "object",
                    additionalProperties: true,
                  },
                  allowPermanentDelete: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              lastAccessTimeTrackingPolicy: {
                type: "object",
                properties: {
                  enable: {
                    type: "boolean",
                  },
                  name: {
                    type: "string",
                  },
                  trackingGranularityInDays: {
                    type: "integer",
                  },
                  blobType: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: ["enable"],
              },
            },
          },
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
        },
      },
    },
  },
};

export default BlobServices_SetServiceProperties;
