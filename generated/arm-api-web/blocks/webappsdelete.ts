import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_Delete: AppBlock = {
  name: "Web Apps / Delete",
  description:
    "Description for Deletes a web, mobile, or API app, or one of the deployment slots.",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
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
        deleteMetrics: {
          name: "Delete Metrics",
          description: "If true, web app metrics are also deleted.",
          type: "boolean",
          required: false,
        },
        deleteEmptyServerFarm: {
          name: "Delete Empty Server Farm",
          description:
            "Specify false if you want to keep empty App Service plan. By default, empty App Service plan is deleted.",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.deleteMetrics
            ? `&deleteMetrics=${input.event.inputConfig.deleteMetrics}`
            : "") +
          (input.event.inputConfig.deleteEmptyServerFarm
            ? `&deleteEmptyServerFarm=${input.event.inputConfig.deleteEmptyServerFarm}`
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

export default WebApps_Delete;
