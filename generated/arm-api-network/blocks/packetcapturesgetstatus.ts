import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PacketCaptures_GetStatus: AppBlock = {
  name: "Packet Captures / Get Status",
  description: "Query the status of a running packet capture session.",
  category: "Packet Captures",
  inputs: {
    default: {
      config: {
        networkWatcherName: {
          name: "Network Watcher Name",
          description: "Name of the network watcher",
          type: "string",
          required: true,
        },
        packetCaptureName: {
          name: "Packet Capture Name",
          description: "Name of the packet capture",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkWatchers/${input.event.inputConfig.networkWatcherName}/packetCaptures/${input.event.inputConfig.packetCaptureName}/queryStatus` +
          "?api-version=2024-10-01";

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
        properties: {
          name: {
            type: "string",
          },
          id: {
            type: "string",
          },
          captureStartTime: {
            type: "string",
          },
          packetCaptureStatus: {
            type: "string",
          },
          stopReason: {
            type: "string",
          },
          packetCaptureError: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

export default PacketCaptures_GetStatus;
