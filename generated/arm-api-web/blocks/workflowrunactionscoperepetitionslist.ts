import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WorkflowRunActionScopeRepetitions_List: AppBlock = {
  name: "Workflow Run Action Scope Repetitions / List",
  description: "List the workflow run action scoped repetitions.",
  category: "Workflow Run Action Scope Repetitions",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/${input.event.inputConfig.workflowName}/runs/${input.event.inputConfig.runName}/actions/${input.event.inputConfig.actionName}/scopeRepetitions` +
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
          nextLink: {
            type: "string",
          },
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    repetitionIndexes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          scopeName: {
                            type: "string",
                          },
                          itemIndex: {
                            type: "integer",
                          },
                        },
                        required: ["itemIndex"],
                        additionalProperties: false,
                      },
                    },
                  },
                  additionalProperties: false,
                },
              },
              required: ["properties"],
              additionalProperties: false,
            },
          },
        },
      },
    },
  },
};

export default WorkflowRunActionScopeRepetitions_List;
