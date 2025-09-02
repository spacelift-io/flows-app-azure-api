import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_ListBackupStatusSecretsSlot: AppBlock = {
  name: "Web Apps / List Backup Status Secrets Slot",
  description:
    "Description for Gets status of a web app backup that may be in progress, including secrets associated with the backup, such as the Azure Storage SAS URL. Also can be used to update the SAS URL for the backup if a new URL is passed in the request body.",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        slot: {
          name: "Slot",
          type: "string",
          required: true,
        },
        backupId: {
          name: "Backup ID",
          description: "Unique identifier",
          type: "string",
          required: true,
        },
        request: {
          name: "Request",
          description: "Information on backup request.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  backupName: {
                    type: "string",
                  },
                  enabled: {
                    type: "boolean",
                  },
                  storageAccountUrl: {
                    type: "string",
                  },
                  backupSchedule: {
                    type: "object",
                    properties: {
                      frequencyInterval: {
                        type: "number",
                      },
                      frequencyUnit: {
                        type: "string",
                      },
                      keepAtLeastOneBackup: {
                        type: "boolean",
                      },
                      retentionPeriodInDays: {
                        type: "number",
                      },
                      startTime: {
                        type: "string",
                      },
                      lastExecutionTime: {
                        type: "string",
                      },
                    },
                    required: [
                      "frequencyInterval",
                      "frequencyUnit",
                      "keepAtLeastOneBackup",
                      "retentionPeriodInDays",
                    ],
                  },
                  databases: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        databaseType: {
                          type: "string",
                        },
                        name: {
                          type: "string",
                        },
                        connectionStringName: {
                          type: "string",
                        },
                        connectionString: {
                          type: "string",
                        },
                      },
                      required: ["databaseType"],
                    },
                  },
                },
                required: ["storageAccountUrl"],
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
        const requestBody = input.event.inputConfig.request;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/backups/${input.event.inputConfig.backupId}/list` +
          "?api-version=2024-11-01";

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
          properties: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              storageAccountUrl: {
                type: "string",
              },
              blobName: {
                type: "string",
              },
              name: {
                type: "string",
              },
              status: {
                type: "string",
              },
              sizeInBytes: {
                type: "integer",
              },
              created: {
                type: "string",
              },
              log: {
                type: "string",
              },
              databases: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    databaseType: {
                      type: "string",
                    },
                    name: {
                      type: "string",
                    },
                    connectionStringName: {
                      type: "string",
                    },
                    connectionString: {
                      type: "string",
                    },
                  },
                  required: ["databaseType"],
                },
              },
              scheduled: {
                type: "boolean",
              },
              lastRestoreTimeStamp: {
                type: "string",
              },
              finishedTimeStamp: {
                type: "string",
              },
              correlationId: {
                type: "string",
              },
              websiteSizeInBytes: {
                type: "integer",
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_ListBackupStatusSecretsSlot;
