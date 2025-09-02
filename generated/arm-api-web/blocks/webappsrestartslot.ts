import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_RestartSlot: AppBlock = {
  name: "Web Apps / Restart Slot",
  description:
    "Description for Restarts an app (or deployment slot, if specified).",
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
        slot: {
          name: "Slot",
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
        softRestart: {
          name: "Soft Restart",
          description:
            "Specify true to apply the configuration settings and restarts the app only if necessary. By default, the API always restarts and reprovisions the app.",
          type: "boolean",
          required: false,
        },
        synchronous: {
          name: "Synchronous",
          description:
            "Specify true to block until the app is restarted. By default, it is set to false, and the API responds immediately (asynchronous).",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/restart` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.softRestart
            ? `&softRestart=${input.event.inputConfig.softRestart}`
            : "") +
          (input.event.inputConfig.synchronous
            ? `&synchronous=${input.event.inputConfig.synchronous}`
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

export default WebApps_RestartSlot;
