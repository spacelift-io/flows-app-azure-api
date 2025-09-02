import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SyncGroups_ListHubSchemas: AppBlock = {
  name: "Sync Groups / List Hub Schemas",
  description: "Gets a collection of hub database schemas.",
  category: "Sync Groups",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        databaseName: {
          name: "Database Name",
          description: "Name of the database",
          type: "string",
          required: true,
        },
        syncGroupName: {
          name: "Sync Group Name",
          description: "Name of the sync group",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/syncGroups/${input.event.inputConfig.syncGroupName}/hubSchemas` +
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
                tables: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      columns: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            dataSize: {
                              type: "string",
                            },
                            dataType: {
                              type: "string",
                            },
                            errorId: {
                              type: "string",
                            },
                            hasError: {
                              type: "boolean",
                            },
                            isPrimaryKey: {
                              type: "boolean",
                            },
                            name: {
                              type: "string",
                            },
                            quotedName: {
                              type: "string",
                            },
                          },
                        },
                      },
                      errorId: {
                        type: "string",
                      },
                      hasError: {
                        type: "boolean",
                      },
                      name: {
                        type: "string",
                      },
                      quotedName: {
                        type: "string",
                      },
                    },
                  },
                },
                lastUpdateTime: {
                  type: "string",
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

export default SyncGroups_ListHubSchemas;
