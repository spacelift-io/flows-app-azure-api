import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Topics_CreateOrUpdate: AppBlock = {
  name: "Topics / Create Or Update",
  description: "Creates a topic in the specified namespace.",
  category: "Topics",
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
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  sizeInBytes: {
                    type: "number",
                  },
                  createdAt: {
                    type: "string",
                  },
                  updatedAt: {
                    type: "string",
                  },
                  accessedAt: {
                    type: "string",
                  },
                  subscriptionCount: {
                    type: "number",
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
                  defaultMessageTimeToLive: {
                    type: "string",
                  },
                  maxSizeInMegabytes: {
                    type: "number",
                  },
                  maxMessageSizeInKilobytes: {
                    type: "number",
                  },
                  requiresDuplicateDetection: {
                    type: "boolean",
                  },
                  duplicateDetectionHistoryTimeWindow: {
                    type: "string",
                  },
                  enableBatchedOperations: {
                    type: "boolean",
                  },
                  status: {
                    type: "string",
                  },
                  supportOrdering: {
                    type: "boolean",
                  },
                  autoDeleteOnIdle: {
                    type: "string",
                  },
                  enablePartitioning: {
                    type: "boolean",
                  },
                  enableExpress: {
                    type: "boolean",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${input.event.inputConfig.namespaceName}/topics/${input.event.inputConfig.topicName}` +
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
              sizeInBytes: {
                type: "integer",
              },
              createdAt: {
                type: "string",
              },
              updatedAt: {
                type: "string",
              },
              accessedAt: {
                type: "string",
              },
              subscriptionCount: {
                type: "integer",
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
              defaultMessageTimeToLive: {
                type: "string",
              },
              maxSizeInMegabytes: {
                type: "integer",
              },
              maxMessageSizeInKilobytes: {
                type: "integer",
              },
              requiresDuplicateDetection: {
                type: "boolean",
              },
              duplicateDetectionHistoryTimeWindow: {
                type: "string",
              },
              enableBatchedOperations: {
                type: "boolean",
              },
              status: {
                type: "string",
              },
              supportOrdering: {
                type: "boolean",
              },
              autoDeleteOnIdle: {
                type: "string",
              },
              enablePartitioning: {
                type: "boolean",
              },
              enableExpress: {
                type: "boolean",
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

export default Topics_CreateOrUpdate;
