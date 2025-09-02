import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SyncMembers_CreateOrUpdate: AppBlock = {
  name: "Sync Members / Create Or Update",
  description: "Creates or updates a sync member.",
  category: "Sync Members",
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
        syncMemberName: {
          name: "Sync Member Name",
          description: "Name of the sync member",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "The requested sync member resource state.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  databaseType: {
                    type: "string",
                  },
                  syncAgentId: {
                    type: "string",
                  },
                  sqlServerDatabaseId: {
                    type: "string",
                  },
                  syncMemberAzureDatabaseResourceId: {
                    type: "string",
                  },
                  usePrivateLinkConnection: {
                    type: "boolean",
                  },
                  privateEndpointName: {
                    type: "string",
                  },
                  serverName: {
                    type: "string",
                  },
                  databaseName: {
                    type: "string",
                  },
                  userName: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                  syncDirection: {
                    type: "string",
                  },
                  syncState: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/syncGroups/${input.event.inputConfig.syncGroupName}/syncMembers/${input.event.inputConfig.syncMemberName}` +
          "?api-version=2023-08-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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
              databaseType: {
                type: "string",
              },
              syncAgentId: {
                type: "string",
              },
              sqlServerDatabaseId: {
                type: "string",
              },
              syncMemberAzureDatabaseResourceId: {
                type: "string",
              },
              usePrivateLinkConnection: {
                type: "boolean",
              },
              privateEndpointName: {
                type: "string",
              },
              serverName: {
                type: "string",
              },
              databaseName: {
                type: "string",
              },
              userName: {
                type: "string",
              },
              password: {
                type: "string",
              },
              syncDirection: {
                type: "string",
              },
              syncState: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default SyncMembers_CreateOrUpdate;
