import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const generatevirtualwanvpnserverconfigurationvpnprofile: AppBlock = {
  name: "generatevirtualwanvpnserverconfigurationvpnprofile",
  description:
    "Generates a unique VPN profile for P2S clients for VirtualWan and associated VpnServerConfiguration combination in the specified resource group.",
  category: "General",
  inputs: {
    default: {
      config: {
        virtualWANName: {
          name: "Virtual Wan Name",
          description: "Name of the virtual wan",
          type: "string",
          required: true,
        },
        vpnClientParams: {
          name: "Vpn Client Params",
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
        const requestBody = input.event.inputConfig.vpnClientParams;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualWans/${input.event.inputConfig.virtualWANName}/GenerateVpnProfile` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
          requestBody,
          undefined,
          input.event.inputConfig.isBinaryData || false,
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
          profileUrl: {
            type: "string",
          },
        },
      },
    },
  },
};

export default generatevirtualwanvpnserverconfigurationvpnprofile;
