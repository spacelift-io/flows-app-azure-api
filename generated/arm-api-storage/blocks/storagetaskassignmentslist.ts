import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StorageTaskAssignments_List: AppBlock = {
  name: "Storage Task Assignments / List",
  description: "List all the storage task assignments in an account",
  category: "Storage Task Assignments",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
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
        $maxpagesize: {
          name: "Max Page Size",
          description:
            "Optional, specifies the maximum number of storage task assignment Ids to be included in the list response.",
          type: "number",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/storageTaskAssignments` +
          "?api-version=2025-01-01" +
          (input.event.inputConfig.$maxpagesize
            ? `&$maxpagesize=${input.event.inputConfig.$maxpagesize}`
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
                    taskId: {
                      type: "string",
                    },
                    enabled: {
                      type: "boolean",
                    },
                    description: {
                      type: "string",
                    },
                    executionContext: {
                      type: "object",
                      properties: {
                        target: {
                          type: "object",
                          properties: {
                            prefix: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            excludePrefix: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                          },
                        },
                        trigger: {
                          type: "object",
                          properties: {
                            type: {
                              type: "string",
                            },
                            parameters: {
                              type: "object",
                              properties: {
                                startFrom: {
                                  type: "string",
                                },
                                interval: {
                                  type: "integer",
                                },
                                intervalUnit: {
                                  type: "string",
                                },
                                endBy: {
                                  type: "string",
                                },
                                startOn: {
                                  type: "string",
                                },
                              },
                            },
                          },
                          required: ["type", "parameters"],
                        },
                      },
                      required: ["trigger"],
                    },
                    report: {
                      type: "object",
                      properties: {
                        prefix: {
                          type: "string",
                        },
                      },
                      required: ["prefix"],
                    },
                    provisioningState: {
                      type: "string",
                    },
                    runStatus: {
                      type: "object",
                      properties: {
                        taskAssignmentId: {
                          type: "string",
                        },
                        storageAccountId: {
                          type: "string",
                        },
                        startTime: {
                          type: "string",
                        },
                        finishTime: {
                          type: "string",
                        },
                        objectsTargetedCount: {
                          type: "string",
                        },
                        objectsOperatedOnCount: {
                          type: "string",
                        },
                        objectFailedCount: {
                          type: "string",
                        },
                        objectsSucceededCount: {
                          type: "string",
                        },
                        runStatusError: {
                          type: "string",
                        },
                        runStatusEnum: {
                          type: "string",
                        },
                        summaryReportPath: {
                          type: "string",
                        },
                        taskId: {
                          type: "string",
                        },
                        taskVersion: {
                          type: "string",
                        },
                        runResult: {
                          type: "string",
                        },
                      },
                    },
                  },
                  required: [
                    "taskId",
                    "enabled",
                    "description",
                    "executionContext",
                    "report",
                  ],
                },
              },
              required: ["properties"],
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

export default StorageTaskAssignments_List;
