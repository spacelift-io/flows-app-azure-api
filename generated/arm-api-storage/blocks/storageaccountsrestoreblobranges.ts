import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StorageAccounts_RestoreBlobRanges: AppBlock = {
  name: "Storage Accounts / Restore Blob Ranges",
  description: "Restore blobs in the specified blob ranges",
  category: "Storage Accounts",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/restoreBlobRanges` +
          "?api-version=2025-01-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          status: {
            type: "string",
          },
          failureReason: {
            type: "string",
          },
          restoreId: {
            type: "string",
          },
          parameters: {
            type: "object",
            properties: {
              timeToRestore: {
                type: "string",
              },
              blobRanges: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    startRange: {
                      type: "string",
                    },
                    endRange: {
                      type: "string",
                    },
                  },
                  required: ["startRange", "endRange"],
                },
              },
            },
            required: ["timeToRestore", "blobRanges"],
          },
        },
      },
    },
  },
};

export default StorageAccounts_RestoreBlobRanges;
