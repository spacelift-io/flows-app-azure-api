import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WorkflowTriggers_List: AppBlock = {
  name: "Workflow Triggers / List",
  description: "Gets a list of workflow triggers.",
  category: "Workflow Triggers",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        workflowName: {
          name: "Workflow Name",
          description: "Name of the workflow",
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
        $top: {
          name: "Top",
          description: "The number of items to be included in the result.",
          type: "number",
          required: false,
        },
        $filter: {
          name: "Filter",
          description: "The filter to apply on the operation.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/${input.event.inputConfig.workflowName}/triggers` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.$top
            ? `&$top=${input.event.inputConfig.$top}`
            : "") +
          (input.event.inputConfig.$filter
            ? `&$filter=${input.event.inputConfig.$filter}`
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
                    provisioningState: {
                      type: "string",
                    },
                    createdTime: {
                      type: "string",
                    },
                    changedTime: {
                      type: "string",
                    },
                    state: {
                      type: "string",
                    },
                    status: {
                      type: "string",
                    },
                    lastExecutionTime: {
                      type: "string",
                    },
                    nextExecutionTime: {
                      type: "string",
                    },
                    recurrence: {
                      type: "object",
                      properties: {
                        frequency: {
                          type: "string",
                        },
                        interval: {
                          type: "integer",
                        },
                        startTime: {
                          type: "string",
                        },
                        endTime: {
                          type: "string",
                        },
                        timeZone: {
                          type: "string",
                        },
                        schedule: {
                          type: "object",
                          properties: {
                            minutes: {
                              type: "array",
                              items: {
                                type: "integer",
                              },
                            },
                            hours: {
                              type: "array",
                              items: {
                                type: "integer",
                              },
                            },
                            weekDays: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            monthDays: {
                              type: "array",
                              items: {
                                type: "integer",
                              },
                            },
                            monthlyOccurrences: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  day: {
                                    type: "string",
                                  },
                                  occurrence: {
                                    type: "integer",
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    workflow: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        name: {
                          type: "string",
                        },
                        type: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
                name: {
                  type: "string",
                },
                type: {
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

export default WorkflowTriggers_List;
