import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGateways_DisconnectVirtualNetworkGatewayVpnConnections: AppBlock =
  {
    name: "Virtual Network Gateways / Disconnect Virtual Network Gateway Vpn Connections",
    description:
      "Disconnect vpn connections of virtual network gateway in the specified resource group.",
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
          request: {
            name: "Request",
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
          const requestBody = input.event.inputConfig.request;

          const url =
            `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/${input.event.inputConfig.virtualNetworkGatewayName}/disconnectVirtualNetworkGatewayVpnConnections` +
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
          additionalProperties: true,
        },
      },
    },
  };

export default VirtualNetworkGateways_DisconnectVirtualNetworkGatewayVpnConnections;
