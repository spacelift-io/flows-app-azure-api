import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StorageAccounts_GetCustomerInitiatedMigration: AppBlock = {
  name: "Storage Accounts / Get Customer Initiated Migration",
  description:
    "Gets the status of the ongoing migration for the specified storage account.",
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
        migrationName: {
          name: "Migration Name",
          description: "Name of the migration",
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
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/accountMigrations/${input.event.inputConfig.migrationName}` +
          "?api-version=2025-01-01";

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
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          type: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              targetSkuName: {
                type: "string",
              },
              migrationStatus: {
                type: "string",
              },
              migrationFailedReason: {
                type: "string",
              },
              migrationFailedDetailedReason: {
                type: "string",
              },
            },
            required: ["targetSkuName"],
          },
        },
        required: ["properties"],
      },
    },
  },
};

export default StorageAccounts_GetCustomerInitiatedMigration;
