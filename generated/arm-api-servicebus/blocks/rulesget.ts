import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Rules_Get: AppBlock = {
  name: "Rules / Get",
  description: "Retrieves the description for the specified rule.",
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
        ruleName: {
          name: "Rule Name",
          description: "Name of the rule",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${input.event.inputConfig.namespaceName}/topics/${input.event.inputConfig.topicName}/subscriptions/${input.event.inputConfig.subscriptionName}/rules/${input.event.inputConfig.ruleName}` +
          "?api-version=2024-01-01";

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
  },
};

export default Rules_Get;
