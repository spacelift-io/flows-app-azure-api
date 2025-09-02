import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGateways_GetAdvertisedRoutes: AppBlock = {
  name: "Virtual Network Gateways / Get Advertised Routes",
  description:
    "This operation retrieves a list of routes the virtual network gateway is advertising to the specified peer.",
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
        peer: {
          name: "Peer",
          description: "The IP address of the peer.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/${input.event.inputConfig.virtualNetworkGatewayName}/getAdvertisedRoutes` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.peer
            ? `&peer=${input.event.inputConfig.peer}`
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
                localAddress: {
                  type: "string",
                },
                network: {
                  type: "string",
                },
                nextHop: {
                  type: "string",
                },
                sourcePeer: {
                  type: "string",
                },
                origin: {
                  type: "string",
                },
                asPath: {
                  type: "string",
                },
                weight: {
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

export default VirtualNetworkGateways_GetAdvertisedRoutes;
