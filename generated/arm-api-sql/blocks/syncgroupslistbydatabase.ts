import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SyncGroups_ListByDatabase: AppBlock = {
  name: "Sync Groups / List By Database",
  description: "Lists sync groups under a hub database.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/syncGroups` +
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
                sku: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    tier: {
                      type: "string",
                    },
                    size: {
                      type: "string",
                    },
                    family: {
                      type: "string",
                    },
                    capacity: {
                      type: "integer",
                    },
                  },
                  required: ["name"],
                },
                properties: {
                  type: "object",
                  properties: {
                    interval: {
                      type: "integer",
                    },
                    lastSyncTime: {
                      type: "string",
                    },
                    conflictResolutionPolicy: {
                      type: "string",
                    },
                    syncDatabaseId: {
                      type: "string",
                    },
                    hubDatabaseUserName: {
                      type: "string",
                    },
                    hubDatabasePassword: {
                      type: "string",
                    },
                    syncState: {
                      type: "string",
                    },
                    schema: {
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
                                    quotedName: {
                                      type: "string",
                                    },
                                    dataSize: {
                                      type: "string",
                                    },
                                    dataType: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                              quotedName: {
                                type: "string",
                              },
                            },
                          },
                        },
                        masterSyncMemberName: {
                          type: "string",
                        },
                      },
                    },
                    enableConflictLogging: {
                      type: "boolean",
                    },
                    conflictLoggingRetentionInDays: {
                      type: "integer",
                    },
                    usePrivateLinkConnection: {
                      type: "boolean",
                    },
                    privateEndpointName: {
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

export default SyncGroups_ListByDatabase;
