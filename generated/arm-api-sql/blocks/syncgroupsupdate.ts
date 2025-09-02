import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SyncGroups_Update: AppBlock = {
  name: "Sync Groups / Update",
  description: "Updates a sync group.",
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
        parameters: {
          name: "Parameters",
          description: "The requested sync group resource state.",
          type: {
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
                    type: "number",
                  },
                },
                required: ["name"],
              },
              properties: {
                type: "object",
                properties: {
                  interval: {
                    type: "number",
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
                    type: "number",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/syncGroups/${input.event.inputConfig.syncGroupName}` +
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
  },
};

export default SyncGroups_Update;
