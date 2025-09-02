import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ElasticPoolOperations_ListByElasticPool: AppBlock = {
  name: "Elastic Pool Operations / List By Elastic Pool",
  description: "Gets a list of operations performed on the elastic pool.",
  category: "Elastic Pool Operations",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        elasticPoolName: {
          name: "Elastic Pool Name",
          description: "Name of the elastic pool",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/elasticPools/${input.event.inputConfig.elasticPoolName}/operations` +
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
                    elasticPoolName: {
                      type: "string",
                    },
                    operation: {
                      type: "string",
                    },
                    operationFriendlyName: {
                      type: "string",
                    },
                    percentComplete: {
                      type: "integer",
                    },
                    serverName: {
                      type: "string",
                    },
                    startTime: {
                      type: "string",
                    },
                    state: {
                      type: "string",
                    },
                    errorCode: {
                      type: "integer",
                    },
                    errorDescription: {
                      type: "string",
                    },
                    errorSeverity: {
                      type: "integer",
                    },
                    isUserError: {
                      type: "boolean",
                    },
                    estimatedCompletionTime: {
                      type: "string",
                    },
                    description: {
                      type: "string",
                    },
                    isCancellable: {
                      type: "boolean",
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

export default ElasticPoolOperations_ListByElasticPool;
