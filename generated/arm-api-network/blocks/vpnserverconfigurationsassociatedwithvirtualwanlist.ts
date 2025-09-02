import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VpnServerConfigurationsAssociatedWithVirtualWan_List: AppBlock = {
  name: "Vpn Server Configurations Associated With Virtual Wan / List",
  description:
    "Gives the list of VpnServerConfigurations associated with Virtual Wan in a resource group.",
  category: "Vpn Server Configurations Associated With Virtual Wan",
  inputs: {
    default: {
      config: {
        virtualWANName: {
          name: "Virtual Wan Name",
          description: "Name of the virtual wan",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualWans/${input.event.inputConfig.virtualWANName}/vpnServerConfigurations` +
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
          vpnServerConfigurationResourceIds: {
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

export default VpnServerConfigurationsAssociatedWithVirtualWan_List;
