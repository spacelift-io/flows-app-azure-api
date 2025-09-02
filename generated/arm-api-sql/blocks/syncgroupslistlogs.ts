import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SyncGroups_ListLogs: AppBlock = {
  name: "Sync Groups / List Logs",
  description: "Gets a collection of sync group logs.",
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
        startTime: {
          name: "Start Time",
          description: "Get logs generated after this time.",
          type: "string",
          required: true,
        },
        endTime: {
          name: "End Time",
          description: "Get logs generated before this time.",
          type: "string",
          required: true,
        },
        type: {
          name: "Type",
          description: "The types of logs to retrieve.",
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
        continuationToken: {
          name: "Continuation Token",
          description: "The continuation token for this operation.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/syncGroups/${input.event.inputConfig.syncGroupName}/logs` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.startTime
            ? `&startTime=${input.event.inputConfig.startTime}`
            : "") +
          (input.event.inputConfig.endTime
            ? `&endTime=${input.event.inputConfig.endTime}`
            : "") +
          (input.event.inputConfig.type
            ? `&type=${input.event.inputConfig.type}`
            : "") +
          (input.event.inputConfig.continuationToken
            ? `&continuationToken=${input.event.inputConfig.continuationToken}`
            : "");

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
                timestamp: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                source: {
                  type: "string",
                },
                details: {
                  type: "string",
                },
                tracingId: {
                  type: "string",
                },
                operationStatus: {
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

export default SyncGroups_ListLogs;
