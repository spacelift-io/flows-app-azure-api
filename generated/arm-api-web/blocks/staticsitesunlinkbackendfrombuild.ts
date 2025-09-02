import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StaticSites_UnlinkBackendFromBuild: AppBlock = {
  name: "Static Sites / Unlink Backend From Build",
  description: "Unlink a backend from a static site build",
  category: "Static Sites",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        environmentName: {
          name: "Environment Name",
          description: "Name of the environment",
          type: "string",
          required: true,
        },
        linkedBackendName: {
          name: "Linked Backend Name",
          description: "Name of the linked backend",
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
        isCleaningAuthConfig: {
          name: "Is Cleaning Auth Config",
          description:
            "Decides if auth will be removed from backend configuration",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/staticSites/${input.event.inputConfig.name}/builds/${input.event.inputConfig.environmentName}/linkedBackends/${input.event.inputConfig.linkedBackendName}` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.isCleaningAuthConfig
            ? `&isCleaningAuthConfig=${input.event.inputConfig.isCleaningAuthConfig}`
            : "");

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

export default StaticSites_UnlinkBackendFromBuild;
