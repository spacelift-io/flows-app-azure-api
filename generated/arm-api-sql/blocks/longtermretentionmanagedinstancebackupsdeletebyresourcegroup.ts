import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LongTermRetentionManagedInstanceBackups_DeleteByResourceGroup: AppBlock =
  {
    name: "Long Term Retention Managed Instance Backups / Delete By Resource Group",
    description: "Deletes a long term retention backup.",
    category: "Long Term Retention Managed Instance Backups",
    inputs: {
      default: {
        config: {
          locationName: {
            name: "Location Name",
            description: "Name of the location",
            type: "string",
            required: true,
          },
          managedInstanceName: {
            name: "Managed Instance Name",
            description: "Name of the managed instance",
            type: "string",
            required: true,
          },
          databaseName: {
            name: "Database Name",
            description: "Name of the database",
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
            `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/locations/${input.event.inputConfig.locationName}/longTermRetentionManagedInstances/${input.event.inputConfig.managedInstanceName}/longTermRetentionDatabases/${input.event.inputConfig.databaseName}/longTermRetentionManagedInstanceBackups/${input.event.inputConfig.backupName}` +
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

export default LongTermRetentionManagedInstanceBackups_DeleteByResourceGroup;
