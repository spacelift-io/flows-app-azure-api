import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGateways_GetVpnclientConnectionHealth: AppBlock = {
  name: "Virtual Network Gateways / Get Vpnclient Connection Health",
  description:
    "Get VPN client connection health detail per P2S client connection of the virtual network gateway in the specified resource group.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/${input.event.inputConfig.virtualNetworkGatewayName}/getVpnClientConnectionHealth` +
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                vpnConnectionId: {
                  type: "string",
                },
                vpnConnectionDuration: {
                  type: "integer",
                },
                vpnConnectionTime: {
                  type: "string",
                },
                publicIpAddress: {
                  type: "string",
                },
                privateIpAddress: {
                  type: "string",
                },
                vpnUserName: {
                  type: "string",
                },
                maxBandwidth: {
                  type: "integer",
                },
                egressPacketsTransferred: {
                  type: "integer",
                },
                egressBytesTransferred: {
                  type: "integer",
                },
                ingressPacketsTransferred: {
                  type: "integer",
                },
                ingressBytesTransferred: {
                  type: "integer",
                },
                maxPacketsPerSecond: {
                  type: "integer",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default VirtualNetworkGateways_GetVpnclientConnectionHealth;
