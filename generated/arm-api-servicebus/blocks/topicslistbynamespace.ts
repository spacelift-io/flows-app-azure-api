import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Topics_ListByNamespace: AppBlock = {
  name: "Topics / List By Namespace",
  description: "Gets all the topics in a namespace.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${input.event.inputConfig.namespaceName}/topics` +
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Topics_ListByNamespace;
