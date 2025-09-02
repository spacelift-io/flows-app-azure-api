import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_StartNetworkTraceSlot: AppBlock = {
  name: "Web Apps / Start Network Trace Slot",
  description: "Description for Start capturing network packets for the site.",
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
        durationInSeconds: {
          name: "Duration In Seconds",
          description: "The duration to keep capturing in seconds.",
          type: "number",
          required: false,
        },
        maxFrameLength: {
          name: "Max Frame Length",
          description: "The maximum frame length in bytes (Optional).",
          type: "number",
          required: false,
        },
        sasUrl: {
          name: "SAS URL",
          description: "The Blob URL to store capture file.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/startNetworkTrace` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.durationInSeconds
            ? `&durationInSeconds=${input.event.inputConfig.durationInSeconds}`
            : "") +
          (input.event.inputConfig.maxFrameLength
            ? `&maxFrameLength=${input.event.inputConfig.maxFrameLength}`
            : "") +
          (input.event.inputConfig.sasUrl
            ? `&sasUrl=${input.event.inputConfig.sasUrl}`
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
        type: "array",
        items: {
          type: "object",
          properties: {
            path: {
              type: "string",
            },
            status: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

export default WebApps_StartNetworkTraceSlot;
