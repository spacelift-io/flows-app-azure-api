import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WorkflowRunActionRepetitionsRequestHistories_Get: AppBlock = {
  name: "Workflow Run Action Repetitions Request Histories / Get",
  description: "Gets a workflow run repetition request history.",
  category: "Workflow Run Action Repetitions Request Histories",
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
        repetitionName: {
          name: "Repetition Name",
          description: "Name of the repetition",
          type: "string",
          required: true,
        },
        requestHistoryName: {
          name: "Request History Name",
          description: "Name of the request history",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/${input.event.inputConfig.workflowName}/runs/${input.event.inputConfig.runName}/actions/${input.event.inputConfig.actionName}/repetitions/${input.event.inputConfig.repetitionName}/requestHistories/${input.event.inputConfig.requestHistoryName}` +
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
              request: {
                type: "object",
                properties: {
                  headers: {
                    type: "object",
                    properties: {},
                  },
                  uri: {
                    type: "string",
                  },
                  method: {
                    type: "string",
                  },
                },
                additionalProperties: false,
              },
              response: {
                type: "object",
                properties: {
                  headers: {
                    type: "object",
                    properties: {},
                  },
                  statusCode: {
                    type: "integer",
                  },
                  bodyLink: {
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
                },
                additionalProperties: false,
              },
            },
            additionalProperties: false,
          },
        },
        additionalProperties: false,
      },
    },
  },
};

export default WorkflowRunActionRepetitionsRequestHistories_Get;
