import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const P2sVpnGateways_GenerateVpnProfile: AppBlock = {
  name: "P2s Vpn Gateways / Generate Vpn Profile",
  description:
    "Generates VPN profile for P2S client of the P2SVpnGateway in the specified resource group.",
  category: "P2s Vpn Gateways",
  inputs: {
    default: {
      config: {
        gatewayName: {
          name: "Gateway Name",
          description: "Name of the gateway",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/${input.event.inputConfig.gatewayName}/generatevpnprofile` +
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

export default P2sVpnGateways_GenerateVpnProfile;
