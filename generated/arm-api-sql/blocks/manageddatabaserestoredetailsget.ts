import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedDatabaseRestoreDetails_Get: AppBlock = {
  name: "Managed Database Restore Details / Get",
  description: "Gets managed database restore details.",
  category: "Managed Database Restore Details",
  inputs: {
    default: {
      config: {
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
        restoreDetailsName: {
          name: "Restore Details Name",
          description: "Name of the restore details",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/databases/${input.event.inputConfig.databaseName}/restoreDetails/${input.event.inputConfig.restoreDetailsName}` +
          "?api-version=2023-08-01";

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
          properties: {
            type: "object",
            properties: {
              type: {
                type: "string",
              },
              status: {
                type: "string",
              },
              blockReason: {
                type: "string",
              },
              lastUploadedFileName: {
                type: "string",
              },
              lastUploadedFileTime: {
                type: "string",
              },
              lastRestoredFileName: {
                type: "string",
              },
              lastRestoredFileTime: {
                type: "string",
              },
              percentCompleted: {
                type: "integer",
              },
              currentRestoredSizeMB: {
                type: "integer",
              },
              currentRestorePlanSizeMB: {
                type: "integer",
              },
              currentBackupType: {
                type: "string",
              },
              currentRestoringFileName: {
                type: "string",
              },
              numberOfFilesDetected: {
                type: "integer",
              },
              numberOfFilesQueued: {
                type: "integer",
              },
              numberOfFilesSkipped: {
                type: "integer",
              },
              numberOfFilesRestoring: {
                type: "integer",
              },
              numberOfFilesRestored: {
                type: "integer",
              },
              numberOfFilesUnrestorable: {
                type: "integer",
              },
              fullBackupSets: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                    },
                    firstStripeName: {
                      type: "string",
                    },
                    numberOfStripes: {
                      type: "integer",
                    },
                    backupSizeMB: {
                      type: "integer",
                    },
                    restoreStartedTimestampUtc: {
                      type: "string",
                    },
                    restoreFinishedTimestampUtc: {
                      type: "string",
                    },
                  },
                },
              },
              diffBackupSets: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              logBackupSets: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              unrestorableFiles: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
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

export default ManagedDatabaseRestoreDetails_Get;
