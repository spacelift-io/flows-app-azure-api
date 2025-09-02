import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedDatabases_Update: AppBlock = {
  name: "Managed Databases / Update",
  description: "Updates an existing database.",
  category: "Managed Databases",
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
        parameters: {
          name: "Parameters",
          description: "The requested database resource state.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  collation: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  creationDate: {
                    type: "string",
                  },
                  earliestRestorePoint: {
                    type: "string",
                  },
                  restorePointInTime: {
                    type: "string",
                  },
                  defaultSecondaryLocation: {
                    type: "string",
                  },
                  catalogCollation: {
                    type: "string",
                  },
                  createMode: {
                    type: "string",
                  },
                  storageContainerUri: {
                    type: "string",
                  },
                  sourceDatabaseId: {
                    type: "string",
                  },
                  crossSubscriptionSourceDatabaseId: {
                    type: "string",
                  },
                  restorableDroppedDatabaseId: {
                    type: "string",
                  },
                  crossSubscriptionRestorableDroppedDatabaseId: {
                    type: "string",
                  },
                  storageContainerIdentity: {
                    type: "string",
                  },
                  storageContainerSasToken: {
                    type: "string",
                  },
                  failoverGroupId: {
                    type: "string",
                  },
                  recoverableDatabaseId: {
                    type: "string",
                  },
                  longTermRetentionBackupResourceId: {
                    type: "string",
                  },
                  autoCompleteRestore: {
                    type: "boolean",
                  },
                  lastBackupName: {
                    type: "string",
                  },
                  crossSubscriptionTargetManagedInstanceId: {
                    type: "string",
                  },
                  isLedgerOn: {
                    type: "boolean",
                  },
                },
              },
              tags: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/databases/${input.event.inputConfig.databaseName}` +
          "?api-version=2023-08-01";

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
              collation: {
                type: "string",
              },
              status: {
                type: "string",
              },
              creationDate: {
                type: "string",
              },
              earliestRestorePoint: {
                type: "string",
              },
              restorePointInTime: {
                type: "string",
              },
              defaultSecondaryLocation: {
                type: "string",
              },
              catalogCollation: {
                type: "string",
              },
              createMode: {
                type: "string",
              },
              storageContainerUri: {
                type: "string",
              },
              sourceDatabaseId: {
                type: "string",
              },
              crossSubscriptionSourceDatabaseId: {
                type: "string",
              },
              restorableDroppedDatabaseId: {
                type: "string",
              },
              crossSubscriptionRestorableDroppedDatabaseId: {
                type: "string",
              },
              storageContainerIdentity: {
                type: "string",
              },
              storageContainerSasToken: {
                type: "string",
              },
              failoverGroupId: {
                type: "string",
              },
              recoverableDatabaseId: {
                type: "string",
              },
              longTermRetentionBackupResourceId: {
                type: "string",
              },
              autoCompleteRestore: {
                type: "boolean",
              },
              lastBackupName: {
                type: "string",
              },
              crossSubscriptionTargetManagedInstanceId: {
                type: "string",
              },
              isLedgerOn: {
                type: "boolean",
              },
            },
          },
        },
        required: ["location"],
      },
    },
  },
};

export default ManagedDatabases_Update;
