import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WorkflowTriggers_ListCallbackUrl: AppBlock = {
  name: "Workflow Triggers / List Callback Url",
  description: "Get the callback URL for a workflow trigger.",
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
        triggerName: {
          name: "Trigger Name",
          description: "Name of the trigger",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/hostruntime/runtime/webhooks/workflow/api/management/workflows/${input.event.inputConfig.workflowName}/triggers/${input.event.inputConfig.triggerName}/listCallbackUrl` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
            type: "string",
          },
          method: {
            type: "string",
          },
          basePath: {
            type: "string",
          },
          relativePath: {
            type: "string",
          },
          relativePathParameters: {
            type: "array",
            items: {
              type: "string",
            },
          },
          queries: {
            type: "object",
            properties: {
              "api-version": {
                type: "string",
              },
              sp: {
                type: "string",
              },
              sv: {
                type: "string",
              },
              sig: {
                type: "string",
              },
              se: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default WorkflowTriggers_ListCallbackUrl;
