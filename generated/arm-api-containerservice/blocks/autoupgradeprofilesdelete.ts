import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AutoUpgradeProfiles_Delete: AppBlock = {
  name: "Auto Upgrade Profiles / Delete",
  description: "Delete a AutoUpgradeProfile",
  category: "Auto Upgrade Profiles",
  inputs: {
    default: {
      config: {
        fleetName: {
          name: "Fleet Name",
          description: "Name of the fleet",
          type: "string",
          required: true,
        },
        autoUpgradeProfileName: {
          name: "Auto Upgrade Profile Name",
          description: "Name of the auto upgrade profile",
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
        If_Match: {
          name: "If Match",
          description:
            "The request should only proceed if an entity matches this string.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.If_Match) {
          additionalHeaders["If-Match"] = String(
            input.event.inputConfig.If_Match,
          );
        }

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/fleets/${input.event.inputConfig.fleetName}/autoUpgradeProfiles/${input.event.inputConfig.autoUpgradeProfileName}` +
          "?api-version=2025-03-01";

        const result = await makeAzureRequest(
          input,
          url,
          "DELETE",
          undefined,
          additionalHeaders,
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

export default AutoUpgradeProfiles_Delete;
