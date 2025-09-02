import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SyncAgents_ListByServer: AppBlock = {
  name: "Sync Agents / List By Server",
  description: "Lists sync agents in a server.",
  category: "Sync Agents",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/syncAgents` +
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
                    name: {
                      type: "string",
                    },
                    syncDatabaseId: {
                      type: "string",
                    },
                    lastAliveTime: {
                      type: "string",
                    },
                    state: {
                      type: "string",
                    },
                    isUpToDate: {
                      type: "boolean",
                    },
                    expiryTime: {
                      type: "string",
                    },
                    version: {
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

export default SyncAgents_ListByServer;
