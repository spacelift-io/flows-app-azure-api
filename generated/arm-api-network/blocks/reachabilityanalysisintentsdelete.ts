import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ReachabilityAnalysisIntents_Delete: AppBlock = {
  name: "Reachability Analysis Intents / Delete",
  description: "Deletes Reachability Analysis Intent.",
  category: "Reachability Analysis Intents",
  inputs: {
    default: {
      config: {
        networkManagerName: {
          name: "Network Manager Name",
          description: "Name of the network manager",
          type: "string",
          required: true,
        },
        workspaceName: {
          name: "Workspace Name",
          description: "Name of the workspace",
          type: "string",
          required: true,
        },
        reachabilityAnalysisIntentName: {
          name: "Reachability Analysis Intent Name",
          description: "Name of the reachability analysis intent",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkManagers/${input.event.inputConfig.networkManagerName}/verifierWorkspaces/${input.event.inputConfig.workspaceName}/reachabilityAnalysisIntents/${input.event.inputConfig.reachabilityAnalysisIntentName}` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "DELETE",
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
        additionalProperties: true,
      },
    },
  },
};

export default ReachabilityAnalysisIntents_Delete;
