import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGateways_GetRoutesInformation: AppBlock = {
  name: "Virtual Network Gateways / Get Routes Information",
  description:
    "This operation retrieves the route set information for an Express Route Gateway based on their resiliency",
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
        attemptRefresh: {
          name: "Attempt Refresh",
          description:
            "Attempt to recalculate the Route Sets Information for the gateway",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/${input.event.inputConfig.virtualNetworkGatewayName}/getRoutesInformation` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.attemptRefresh
            ? `&attemptRefresh=${input.event.inputConfig.attemptRefresh}`
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
          lastComputedTime: {
            type: "string",
          },
          nextEligibleComputeTime: {
            type: "string",
          },
          routeSetVersion: {
            type: "string",
          },
          routeSets: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                locations: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                details: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
          },
          circuitsMetadataMap: {
            type: "object",
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export default VirtualNetworkGateways_GetRoutesInformation;
