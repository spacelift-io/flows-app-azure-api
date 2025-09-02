import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LongTermRetentionBackups_ListByResourceGroupServer: AppBlock = {
  name: "Long Term Retention Backups / List By Resource Group Server",
  description:
    "Lists the long term retention backups for a given server based on resource groups.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/locations/${input.event.inputConfig.locationName}/longTermRetentionServers/${input.event.inputConfig.longTermRetentionServerName}/longTermRetentionBackups` +
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
                    serverName: {
                      type: "string",
                    },
                    serverCreateTime: {
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
                    requestedBackupStorageRedundancy: {
                      type: "string",
                    },
                    isBackupImmutable: {
                      type: "boolean",
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

export default LongTermRetentionBackups_ListByResourceGroupServer;
