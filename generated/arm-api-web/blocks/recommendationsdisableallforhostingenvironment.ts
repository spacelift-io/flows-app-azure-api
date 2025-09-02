import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Recommendations_DisableAllForHostingEnvironment: AppBlock = {
  name: "Recommendations / Disable All For Hosting Environment",
  description: "Description for Disable all recommendations for an app.",
  category: "Recommendations",
  inputs: {
    default: {
      config: {
        hostingEnvironmentName: {
          name: "Hosting Environment Name",
          description: "Name of the hosting environment",
          type: "string",
          required: true,
        },
        environmentName: {
          name: "Environment Name",
          description: "Name of the app.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/${input.event.inputConfig.hostingEnvironmentName}/recommendations/disable` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.environmentName
            ? `&environmentName=${input.event.inputConfig.environmentName}`
            : "");

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
        additionalProperties: true,
      },
    },
  },
};

export default Recommendations_DisableAllForHostingEnvironment;
