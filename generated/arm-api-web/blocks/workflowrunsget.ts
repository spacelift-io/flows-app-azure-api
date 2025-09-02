import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WorkflowRuns_Get: AppBlock = {
  name: "Workflow Runs / Get",
  description: "Gets a workflow run.",
  category: "Workflow Runs",
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
        runName: {
          name: "Run Name",
          description: "Name of the run",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/${input.event.inputConfig.workflowName}/runs/${input.event.inputConfig.runName}` +
          "?api-version=2024-11-01";

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
              waitEndTime: {
                type: "string",
              },
              startTime: {
                type: "string",
              },
              endTime: {
                type: "string",
              },
              status: {
                type: "string",
              },
              code: {
                type: "string",
              },
              error: {
                type: "object",
                properties: {},
              },
              correlationId: {
                type: "string",
              },
              correlation: {
                type: "object",
                properties: {
                  clientTrackingId: {
                    type: "string",
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
              trigger: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  inputs: {
                    type: "object",
                    properties: {},
                  },
                  inputsLink: {
                    type: "object",
                    properties: {
                      uri: {
                        type: "string",
                      },
                      contentVersion: {
                        type: "string",
                      },
                      contentSize: {
                        type: "integer",
                      },
                      contentHash: {
                        type: "object",
                        properties: {
                          algorithm: {
                            type: "string",
                          },
                          value: {
                            type: "string",
                          },
                        },
                      },
                      metadata: {
                        type: "object",
                        properties: {},
                      },
                    },
                  },
                  outputs: {
                    type: "object",
                    properties: {},
                  },
                  outputsLink: {
                    type: "object",
                    properties: {
                      uri: {
                        type: "object",
                        additionalProperties: true,
                      },
                      contentVersion: {
                        type: "object",
                        additionalProperties: true,
                      },
                      contentSize: {
                        type: "object",
                        additionalProperties: true,
                      },
                      contentHash: {
                        type: "object",
                        additionalProperties: true,
                      },
                      metadata: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                  },
                  scheduledTime: {
                    type: "string",
                  },
                  startTime: {
                    type: "string",
                  },
                  endTime: {
                    type: "string",
                  },
                  trackingId: {
                    type: "string",
                  },
                  correlation: {
                    type: "object",
                    properties: {
                      clientTrackingId: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                  },
                  code: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  error: {
                    type: "object",
                    properties: {},
                  },
                  trackedProperties: {
                    type: "object",
                    properties: {},
                  },
                },
              },
              outputs: {
                type: "object",
                additionalProperties: true,
              },
              response: {
                type: "object",
                properties: {
                  name: {
                    type: "object",
                    additionalProperties: true,
                  },
                  inputs: {
                    type: "object",
                    additionalProperties: true,
                  },
                  inputsLink: {
                    type: "object",
                    additionalProperties: true,
                  },
                  outputs: {
                    type: "object",
                    additionalProperties: true,
                  },
                  outputsLink: {
                    type: "object",
                    additionalProperties: true,
                  },
                  scheduledTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  startTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  endTime: {
                    type: "object",
                    additionalProperties: true,
                  },
                  trackingId: {
                    type: "object",
                    additionalProperties: true,
                  },
                  correlation: {
                    type: "object",
                    additionalProperties: true,
                  },
                  code: {
                    type: "object",
                    additionalProperties: true,
                  },
                  status: {
                    type: "object",
                    additionalProperties: true,
                  },
                  error: {
                    type: "object",
                    additionalProperties: true,
                  },
                  trackedProperties: {
                    type: "object",
                    additionalProperties: true,
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
  },
};

export default WorkflowRuns_Get;
