import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworks_ListDdosProtectionStatus: AppBlock = {
  name: "Virtual Networks / List Ddos Protection Status",
  description:
    "Gets the Ddos Protection Status of all IP Addresses under the Virtual Network",
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
        top: {
          name: "Top",
          description: "The max number of ip addresses to return.",
          type: "number",
          required: false,
        },
        skipToken: {
          name: "Skip Token",
          description: "The skipToken that is given with nextLink.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworks/${input.event.inputConfig.virtualNetworkName}/ddosProtectionStatus` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.top
            ? `&top=${input.event.inputConfig.top}`
            : "") +
          (input.event.inputConfig.skipToken
            ? `&skipToken=${input.event.inputConfig.skipToken}`
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
        properties: {
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                publicIpAddressId: {
                  type: "string",
                },
                publicIpAddress: {
                  type: "string",
                },
                isWorkloadProtected: {
                  type: "string",
                },
                ddosProtectionPlanId: {
                  type: "string",
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default VirtualNetworks_ListDdosProtectionStatus;
