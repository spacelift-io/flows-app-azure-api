import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VpnConnections_StopPacketCapture: AppBlock = {
  name: "Vpn Connections / Stop Packet Capture",
  description:
    "Stops packet capture on Vpn connection in the specified resource group.",
  category: "Vpn Connections",
  inputs: {
    default: {
      config: {
        gatewayName: {
          name: "Gateway Name",
          description: "Name of the gateway",
          type: "string",
          required: true,
        },
        vpnConnectionName: {
          name: "Vpn Connection Name",
          description: "Name of the vpn connection",
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
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/vpnGateways/${input.event.inputConfig.gatewayName}/vpnConnections/${input.event.inputConfig.vpnConnectionName}/stoppacketcapture` +
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
        type: "string",
      },
    },
  },
};

export default VpnConnections_StopPacketCapture;
