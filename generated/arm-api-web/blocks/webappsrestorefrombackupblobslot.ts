import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_RestoreFromBackupBlobSlot: AppBlock = {
  name: "Web Apps / Restore From Backup Blob Slot",
  description:
    "Description for Restores an app from a backup blob in Azure Storage.",
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
        request: {
          name: "Request",
          description: "Information on restore request .",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  storageAccountUrl: {
                    type: "string",
                  },
                  blobName: {
                    type: "string",
                  },
                  overwrite: {
                    type: "boolean",
                  },
                  siteName: {
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
                  ignoreConflictingHostNames: {
                    type: "boolean",
                  },
                  ignoreDatabases: {
                    type: "boolean",
                  },
                  appServicePlan: {
                    type: "string",
                  },
                  operationType: {
                    type: "string",
                  },
                  adjustConnectionStrings: {
                    type: "boolean",
                  },
                  hostingEnvironment: {
                    type: "string",
                  },
                },
                required: ["storageAccountUrl", "overwrite"],
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/restoreFromBackupBlob` +
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
        additionalProperties: true,
      },
    },
  },
};

export default WebApps_RestoreFromBackupBlobSlot;
