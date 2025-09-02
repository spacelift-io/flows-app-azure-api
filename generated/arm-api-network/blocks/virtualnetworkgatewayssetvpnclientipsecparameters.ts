import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGateways_SetVpnclientIpsecParameters: AppBlock = {
  name: "Virtual Network Gateways / Set Vpnclient Ipsec Parameters",
  description:
    "The Set VpnclientIpsecParameters operation sets the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider.",
  category: "Virtual Network Gateways",
  inputs: {
    default: {
      config: {
        virtualNetworkGatewayName: {
          name: "Virtual Network Gateway Name",
          description: "Name of the virtual network gateway",
          type: "string",
          required: true,
        },
        vpnclientIpsecParams: {
          name: "Vpnclient Ipsec Params",
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
        const requestBody = input.event.inputConfig.vpnclientIpsecParams;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/${input.event.inputConfig.virtualNetworkGatewayName}/setvpnclientipsecparameters` +
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
          saLifeTimeSeconds: {
            type: "integer",
          },
          saDataSizeKilobytes: {
            type: "integer",
          },
          ipsecEncryption: {
            type: "string",
          },
          ipsecIntegrity: {
            type: "string",
          },
          ikeEncryption: {
            type: "string",
          },
          ikeIntegrity: {
            type: "string",
          },
          dhGroup: {
            type: "string",
          },
          pfsGroup: {
            type: "string",
          },
        },
        required: [
          "saLifeTimeSeconds",
          "saDataSizeKilobytes",
          "ipsecEncryption",
          "ipsecIntegrity",
          "ikeEncryption",
          "ikeIntegrity",
          "dhGroup",
          "pfsGroup",
        ],
      },
    },
  },
};

export default VirtualNetworkGateways_SetVpnclientIpsecParameters;
