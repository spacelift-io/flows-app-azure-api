import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Subscriptions_CreateOrUpdate: AppBlock = {
  name: "Subscriptions / Create Or Update",
  description: "Creates a topic subscription.",
  category: "Subscriptions",
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
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  messageCount: {
                    type: "number",
                  },
                  createdAt: {
                    type: "string",
                  },
                  accessedAt: {
                    type: "string",
                  },
                  updatedAt: {
                    type: "string",
                  },
                  countDetails: {
                    type: "object",
                    properties: {
                      activeMessageCount: {
                        type: "number",
                      },
                      deadLetterMessageCount: {
                        type: "number",
                      },
                      scheduledMessageCount: {
                        type: "number",
                      },
                      transferMessageCount: {
                        type: "number",
                      },
                      transferDeadLetterMessageCount: {
                        type: "number",
                      },
                    },
                  },
                  lockDuration: {
                    type: "string",
                  },
                  requiresSession: {
                    type: "boolean",
                  },
                  defaultMessageTimeToLive: {
                    type: "string",
                  },
                  deadLetteringOnFilterEvaluationExceptions: {
                    type: "boolean",
                  },
                  deadLetteringOnMessageExpiration: {
                    type: "boolean",
                  },
                  duplicateDetectionHistoryTimeWindow: {
                    type: "string",
                  },
                  maxDeliveryCount: {
                    type: "number",
                  },
                  status: {
                    type: "string",
                  },
                  enableBatchedOperations: {
                    type: "boolean",
                  },
                  autoDeleteOnIdle: {
                    type: "string",
                  },
                  forwardTo: {
                    type: "string",
                  },
                  forwardDeadLetteredMessagesTo: {
                    type: "string",
                  },
                  isClientAffine: {
                    type: "boolean",
                  },
                  clientAffineProperties: {
                    type: "object",
                    properties: {
                      clientId: {
                        type: "string",
                      },
                      isDurable: {
                        type: "boolean",
                      },
                      isShared: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${input.event.inputConfig.namespaceName}/topics/${input.event.inputConfig.topicName}/subscriptions/${input.event.inputConfig.subscriptionName}` +
          "?api-version=2024-01-01";

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
              messageCount: {
                type: "integer",
              },
              createdAt: {
                type: "string",
              },
              accessedAt: {
                type: "string",
              },
              updatedAt: {
                type: "string",
              },
              countDetails: {
                type: "object",
                properties: {
                  activeMessageCount: {
                    type: "integer",
                  },
                  deadLetterMessageCount: {
                    type: "integer",
                  },
                  scheduledMessageCount: {
                    type: "integer",
                  },
                  transferMessageCount: {
                    type: "integer",
                  },
                  transferDeadLetterMessageCount: {
                    type: "integer",
                  },
                },
              },
              lockDuration: {
                type: "string",
              },
              requiresSession: {
                type: "boolean",
              },
              defaultMessageTimeToLive: {
                type: "string",
              },
              deadLetteringOnFilterEvaluationExceptions: {
                type: "boolean",
              },
              deadLetteringOnMessageExpiration: {
                type: "boolean",
              },
              duplicateDetectionHistoryTimeWindow: {
                type: "string",
              },
              maxDeliveryCount: {
                type: "integer",
              },
              status: {
                type: "string",
              },
              enableBatchedOperations: {
                type: "boolean",
              },
              autoDeleteOnIdle: {
                type: "string",
              },
              forwardTo: {
                type: "string",
              },
              forwardDeadLetteredMessagesTo: {
                type: "string",
              },
              isClientAffine: {
                type: "boolean",
              },
              clientAffineProperties: {
                type: "object",
                properties: {
                  clientId: {
                    type: "string",
                  },
                  isDurable: {
                    type: "boolean",
                  },
                  isShared: {
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

export default Subscriptions_CreateOrUpdate;
