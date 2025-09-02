import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const P2sVpnGateways_DisconnectP2sVpnConnections: AppBlock = {
  name: "P2s Vpn Gateways / Disconnect P2s Vpn Connections",
  description:
    "Disconnect P2S vpn connections of the virtual wan P2SVpnGateway in the specified resource group.",
  category: "P2s Vpn Gateways",
  inputs: {
    default: {
      config: {
        p2sVpnGatewayName: {
          name: "P2s Vpn Gateway Name",
          description: "Name of the p2s vpn gateway",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/${input.event.inputConfig.p2sVpnGatewayName}/disconnectP2sVpnConnections` +
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

export default P2sVpnGateways_DisconnectP2sVpnConnections;
