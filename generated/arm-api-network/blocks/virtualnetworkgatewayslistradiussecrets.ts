import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGateways_ListRadiusSecrets: AppBlock = {
  name: "Virtual Network Gateways / List Radius Secrets",
  description:
    "List all Radius servers with respective radius secrets from virtual network gateway VpnClientConfiguration.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/${input.event.inputConfig.virtualNetworkGatewayName}/listRadiusSecrets` +
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
                radiusServerAddress: {
                  type: "string",
                },
                radiusServerSecret: {
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

export default VirtualNetworkGateways_ListRadiusSecrets;
