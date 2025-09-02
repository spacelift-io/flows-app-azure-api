import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LongTermRetentionBackups_Delete: AppBlock = {
  name: "Long Term Retention Backups / Delete",
  description: "Deletes a long term retention backup.",
  category: "Long Term Retention Backups",
  inputs: {
    default: {
      config: {
        locationName: {
          name: "Location Name",
          description: "Name of the location",
          type: "string",
          required: true,
        },
        longTermRetentionServerName: {
          name: "Long Term Retention Server Name",
          description: "Name of the long term retention server",
          type: "string",
          required: true,
        },
        longTermRetentionDatabaseName: {
          name: "Long Term Retention Database Name",
          description: "Name of the long term retention database",
          type: "string",
          required: true,
        },
        backupName: {
          name: "Backup Name",
          description: "Name of the backup",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Sql/locations/${input.event.inputConfig.locationName}/longTermRetentionServers/${input.event.inputConfig.longTermRetentionServerName}/longTermRetentionDatabases/${input.event.inputConfig.longTermRetentionDatabaseName}/longTermRetentionBackups/${input.event.inputConfig.backupName}` +
          "?api-version=2023-08-01";

        const result = await makeAzureRequest(
          input,
          url,
          "DELETE",
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
        additionalProperties: true,
      },
    },
  },
};

export default LongTermRetentionBackups_Delete;
