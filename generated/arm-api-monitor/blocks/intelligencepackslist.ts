import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const IntelligencePacks_List: AppBlock = {
  name: "Intelligence Packs / List",
  description:
    "Lists all the intelligence packs possible and whether they are enabled or disabled for a given workspace.",
  category: "Intelligence Packs",
  inputs: {
    default: {
      config: {
        workspaceName: {
          name: "Workspace Name",
          description: "Name of the workspace",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourcegroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/${input.event.inputConfig.workspaceName}/intelligencePacks` +
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
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            enabled: {
              type: "boolean",
            },
            displayName: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

export default IntelligencePacks_List;
