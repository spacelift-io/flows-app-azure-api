import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WorkspacePurge_GetPurgeStatus: AppBlock = {
  name: "Workspace Purge / Get Purge Status",
  description: "Gets status of an ongoing purge operation.",
  category: "Workspace Purge",
  inputs: {
    default: {
      config: {
        workspaceName: {
          name: "Workspace Name",
          description: "Name of the workspace",
          type: "string",
          required: true,
        },
        purgeId: {
          name: "Purge ID",
          description: "Unique identifier",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/${input.event.inputConfig.workspaceName}/operations/${input.event.inputConfig.purgeId}` +
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
          status: {
            type: "string",
          },
        },
        required: ["status"],
      },
    },
  },
};

export default WorkspacePurge_GetPurgeStatus;
