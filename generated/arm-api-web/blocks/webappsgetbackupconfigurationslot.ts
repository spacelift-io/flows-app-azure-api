import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_GetBackupConfigurationSlot: AppBlock = {
  name: "Web Apps / Get Backup Configuration Slot",
  description: "Description for Gets the backup configuration of an app.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/config/backup/list` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
                    type: "integer",
                  },
                  frequencyUnit: {
                    type: "string",
                  },
                  keepAtLeastOneBackup: {
                    type: "boolean",
                  },
                  retentionPeriodInDays: {
                    type: "integer",
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
    },
  },
};

export default WebApps_GetBackupConfigurationSlot;
