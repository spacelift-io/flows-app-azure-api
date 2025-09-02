import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_ListSiteBackupsSlot: AppBlock = {
  name: "Web Apps / List Site Backups Slot",
  description: "Description for Gets existing backups of an app.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/listbackups` +
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
          value: {
            type: "array",
            items: {
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
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default WebApps_ListSiteBackupsSlot;
