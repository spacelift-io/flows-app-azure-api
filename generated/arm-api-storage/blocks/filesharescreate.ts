import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FileShares_Create: AppBlock = {
  name: "File Shares / Create",
  description:
    "Creates a new share under the specified account as described by request body. The share resource includes metadata and properties for that share. It does not include a list of the files contained by the share.",
  category: "File Shares",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        shareName: {
          name: "Share Name",
          description: "Name of the share",
          type: "string",
          required: true,
        },
        fileShare: {
          name: "File Share",
          description: "Properties of the file share to create.",
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
        $expand: {
          name: "Expand",
          description:
            "Optional, used to expand the properties within share's properties. Valid values are: snapshots. Should be passed as a string with delimiter ','",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.fileShare;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/fileServices/default/shares/${input.event.inputConfig.shareName}` +
          "?api-version=2025-01-01" +
          (input.event.inputConfig.$expand
            ? `&$expand=${input.event.inputConfig.$expand}`
            : "");

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
              lastModifiedTime: {
                type: "string",
              },
              metadata: {
                type: "object",
                additionalProperties: true,
              },
              shareQuota: {
                type: "integer",
              },
              provisionedIops: {
                type: "integer",
              },
              provisionedBandwidthMibps: {
                type: "integer",
              },
              includedBurstIops: {
                type: "integer",
              },
              maxBurstCreditsForIops: {
                type: "integer",
              },
              nextAllowedQuotaDowngradeTime: {
                type: "string",
              },
              nextAllowedProvisionedIopsDowngradeTime: {
                type: "string",
              },
              nextAllowedProvisionedBandwidthDowngradeTime: {
                type: "string",
              },
              enabledProtocols: {
                type: "string",
              },
              rootSquash: {
                type: "string",
              },
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
              accessTier: {
                type: "string",
              },
              accessTierChangeTime: {
                type: "string",
              },
              accessTierStatus: {
                type: "string",
              },
              shareUsageBytes: {
                type: "integer",
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
              signedIdentifiers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    accessPolicy: {
                      type: "object",
                      properties: {
                        startTime: {
                          type: "string",
                        },
                        expiryTime: {
                          type: "string",
                        },
                        permission: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              snapshotTime: {
                type: "string",
              },
              fileSharePaidBursting: {
                type: "object",
                properties: {
                  paidBurstingEnabled: {
                    type: "boolean",
                  },
                  paidBurstingMaxIops: {
                    type: "integer",
                  },
                  paidBurstingMaxBandwidthMibps: {
                    type: "integer",
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

export default FileShares_Create;
