import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LinkedServices_Get: AppBlock = {
  name: "Linked Services / Get",
  description: "Gets a linked service instance.",
  category: "Linked Services",
  inputs: {
    default: {
      config: {
        workspaceName: {
          name: "Workspace Name",
          description: "Name of the workspace",
          type: "string",
          required: true,
        },
        linkedServiceName: {
          name: "Linked Service Name",
          description: "Name of the linked service",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourcegroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/${input.event.inputConfig.workspaceName}/linkedServices/${input.event.inputConfig.linkedServiceName}` +
          "?api-version=2025-02-01";

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
              resourceId: {
                type: "string",
              },
              writeAccessResourceId: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
            },
          },
          tags: {
            type: "object",
            additionalProperties: true,
          },
        },
        required: ["properties"],
      },
    },
  },
};

export default LinkedServices_Get;
