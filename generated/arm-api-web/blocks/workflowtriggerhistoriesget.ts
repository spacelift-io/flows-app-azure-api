import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WorkflowTriggerHistories_Get: AppBlock = {
  name: "Workflow Trigger Histories / Get",
  description: "Gets a workflow trigger history.",
  category: "Workflow Trigger Histories",
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
        triggerName: {
          name: "Trigger Name",
          description: "Name of the trigger",
          type: "string",
          required: true,
        },
        historyName: {
          name: "History Name",
          description: "Name of the history",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/${input.event.inputConfig.workflowName}/triggers/${input.event.inputConfig.triggerName}/histories/${input.event.inputConfig.historyName}` +
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
              scheduledTime: {
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
                  clientTrackingId: {
                    type: "string",
                  },
                },
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
              fired: {
                type: "boolean",
              },
              run: {
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
  },
};

export default WorkflowTriggerHistories_Get;
