import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworks_CheckIPAddressAvailability: AppBlock = {
  name: "Virtual Networks / Check IP Address Availability",
  description: "Checks whether a private IP address is available for use.",
  category: "Virtual Networks",
  inputs: {
    default: {
      config: {
        virtualNetworkName: {
          name: "Virtual Network Name",
          description: "Name of the virtual network",
          type: "string",
          required: true,
        },
        ipAddress: {
          name: "IP Address",
          description: "The private IP address to be verified.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworks/${input.event.inputConfig.virtualNetworkName}/CheckIPAddressAvailability` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.ipAddress
            ? `&ipAddress=${input.event.inputConfig.ipAddress}`
            : "");

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
          available: {
            type: "boolean",
          },
          availableIPAddresses: {
            type: "array",
            items: {
              type: "string",
            },
          },
          isPlatformReserved: {
            type: "boolean",
          },
        },
      },
    },
  },
};

export default VirtualNetworks_CheckIPAddressAvailability;
