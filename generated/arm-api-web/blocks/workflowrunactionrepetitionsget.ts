import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WorkflowRunActionRepetitions_Get: AppBlock = {
  name: "Workflow Run Action Repetitions / Get",
  description: "Get a workflow run action repetition.",
  category: "Workflow Run Action Repetitions",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/${input.event.inputConfig.workflowName}/runs/${input.event.inputConfig.runName}/actions/${input.event.inputConfig.actionName}/repetitions/${input.event.inputConfig.repetitionName}` +
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
};

export default WorkflowRunActionRepetitions_Get;
