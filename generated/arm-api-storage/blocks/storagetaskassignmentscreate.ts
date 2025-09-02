import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StorageTaskAssignments_Create: AppBlock = {
  name: "Storage Task Assignments / Create",
  description:
    "Asynchronously creates a new storage task assignment sub-resource with the specified parameters. If a storage task assignment is already created and a subsequent create request is issued with different properties, the storage task assignment properties will be updated. If a storage task assignment is already created and a subsequent create or update request is issued with the exact same set of properties, the request will succeed.",
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
        storageTaskAssignmentName: {
          name: "Storage Task Assignment Name",
          description: "Name of the storage task assignment",
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
                                type: "number",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/storageTaskAssignments/${input.event.inputConfig.storageTaskAssignmentName}` +
          "?api-version=2025-01-01";

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
  },
};

export default StorageTaskAssignments_Create;
