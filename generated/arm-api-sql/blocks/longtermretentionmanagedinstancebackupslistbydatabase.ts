import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LongTermRetentionManagedInstanceBackups_ListByDatabase: AppBlock = {
  name: "Long Term Retention Managed Instance Backups / List By Database",
  description: "Lists all long term retention backups for a managed database.",
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
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
        onlyLatestPerDatabase: {
          name: "Only Latest Per Database",
          description:
            "Whether or not to only get the latest backup for each database.",
          type: "boolean",
          required: false,
        },
        databaseState: {
          name: "Database State",
          description:
            "Whether to query against just live databases, just deleted databases, or all databases.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Sql/locations/${input.event.inputConfig.locationName}/longTermRetentionManagedInstances/${input.event.inputConfig.managedInstanceName}/longTermRetentionDatabases/${input.event.inputConfig.databaseName}/longTermRetentionManagedInstanceBackups` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.onlyLatestPerDatabase
            ? `&onlyLatestPerDatabase=${input.event.inputConfig.onlyLatestPerDatabase}`
            : "") +
          (input.event.inputConfig.databaseState
            ? `&databaseState=${input.event.inputConfig.databaseState}`
            : "");

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
                    managedInstanceName: {
                      type: "string",
                    },
                    managedInstanceCreateTime: {
                      type: "string",
                    },
                    databaseName: {
                      type: "string",
                    },
                    databaseDeletionTime: {
                      type: "string",
                    },
                    backupTime: {
                      type: "string",
                    },
                    backupExpirationTime: {
                      type: "string",
                    },
                    backupStorageRedundancy: {
                      type: "string",
                    },
                    backupStorageAccessTier: {
                      type: "string",
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
      },
    },
  },
};

export default LongTermRetentionManagedInstanceBackups_ListByDatabase;
