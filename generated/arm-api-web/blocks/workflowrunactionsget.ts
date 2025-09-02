import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WorkflowRunActions_Get: AppBlock = {
  name: "Workflow Run Actions / Get",
  description: "Gets a workflow run action.",
  category: "Workflow Run Actions",
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
        actionName: {
          name: "Action Name",
          description: "Name of the action",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/${input.event.inputConfig.workflowName}/runs/${input.event.inputConfig.runName}/actions/${input.event.inputConfig.actionName}` +
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
              trackingId: {
                type: "string",
              },
              correlation: {
                type: "object",
                properties: {
                  actionTrackingId: {
                    type: "string",
                  },
                },
                additionalProperties: false,
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
              trackedProperties: {
                type: "object",
                properties: {},
              },
              retryHistory: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    startTime: {
                      type: "string",
                    },
                    endTime: {
                      type: "string",
                    },
                    code: {
                      type: "string",
                    },
                    clientRequestId: {
                      type: "string",
                    },
                    serviceRequestId: {
                      type: "string",
                    },
                    error: {
                      type: "object",
                      properties: {
                        error: {
                          type: "object",
                          properties: {
                            code: {
                              type: "string",
                            },
                            message: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
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

export default WorkflowRunActions_Get;
