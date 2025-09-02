import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedDatabases_ListInaccessibleByInstance: AppBlock = {
  name: "Managed Databases / List Inaccessible By Instance",
  description:
    "Gets a list of inaccessible managed databases in a managed instance",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/inaccessibleManagedDatabases` +
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
          value: {
            type: "array",
            items: {
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ManagedDatabases_ListInaccessibleByInstance;
