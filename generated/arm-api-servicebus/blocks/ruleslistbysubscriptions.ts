import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Rules_ListBySubscriptions: AppBlock = {
  name: "Rules / List By Subscriptions",
  description: "List all the rules within given topic-subscription",
  category: "Rules",
  inputs: {
    default: {
      config: {
        namespaceName: {
          name: "Namespace Name",
          description: "Name of the namespace",
          type: "string",
          required: true,
        },
        topicName: {
          name: "Topic Name",
          description: "Name of the topic",
          type: "string",
          required: true,
        },
        subscriptionName: {
          name: "Subscription Name",
          description: "Name of the subscription",
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
        $skip: {
          name: "Skip",
          type: "number",
          required: false,
        },
        $top: {
          name: "Top",
          description:
            "May be used to limit the number of results to the most recent N usageDetails.",
          type: "number",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${input.event.inputConfig.namespaceName}/topics/${input.event.inputConfig.topicName}/subscriptions/${input.event.inputConfig.subscriptionName}/rules` +
          "?api-version=2024-01-01" +
          (input.event.inputConfig.$skip
            ? `&$skip=${input.event.inputConfig.$skip}`
            : "") +
          (input.event.inputConfig.$top
            ? `&$top=${input.event.inputConfig.$top}`
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
                properties: {
                  type: "object",
                  properties: {
                    action: {
                      type: "object",
                      properties: {
                        sqlExpression: {
                          type: "string",
                        },
                        compatibilityLevel: {
                          type: "integer",
                        },
                        requiresPreprocessing: {
                          type: "boolean",
                        },
                      },
                    },
                    filterType: {
                      type: "string",
                    },
                    sqlFilter: {
                      type: "object",
                      properties: {
                        sqlExpression: {
                          type: "string",
                        },
                        compatibilityLevel: {
                          type: "integer",
                        },
                        requiresPreprocessing: {
                          type: "boolean",
                        },
                      },
                    },
                    correlationFilter: {
                      type: "object",
                      properties: {
                        properties: {
                          type: "object",
                          additionalProperties: true,
                        },
                        correlationId: {
                          type: "string",
                        },
                        messageId: {
                          type: "string",
                        },
                        to: {
                          type: "string",
                        },
                        replyTo: {
                          type: "string",
                        },
                        label: {
                          type: "string",
                        },
                        sessionId: {
                          type: "string",
                        },
                        replyToSessionId: {
                          type: "string",
                        },
                        contentType: {
                          type: "string",
                        },
                        requiresPreprocessing: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                },
                systemData: {
                  type: "object",
                  properties: {
                    createdBy: {
                      type: "string",
                    },
                    createdByType: {
                      type: "string",
                    },
                    createdAt: {
                      type: "string",
                    },
                    lastModifiedBy: {
                      type: "string",
                    },
                    lastModifiedByType: {
                      type: "string",
                    },
                    lastModifiedAt: {
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

export default Rules_ListBySubscriptions;
