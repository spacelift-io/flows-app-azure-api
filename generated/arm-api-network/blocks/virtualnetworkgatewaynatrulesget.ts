import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGatewayNatRules_Get: AppBlock = {
  name: "Virtual Network Gateway Nat Rules / Get",
  description: "Retrieves the details of a nat rule.",
  category: "Virtual Network Gateway Nat Rules",
  inputs: {
    default: {
      config: {
        virtualNetworkGatewayName: {
          name: "Virtual Network Gateway Name",
          description: "Name of the virtual network gateway",
          type: "string",
          required: true,
        },
        natRuleName: {
          name: "Nat Rule Name",
          description: "Name of the nat rule",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/${input.event.inputConfig.virtualNetworkGatewayName}/natRules/${input.event.inputConfig.natRuleName}` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "GET",
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
          properties: {
            type: "object",
            properties: {
              provisioningState: {
                type: "string",
              },
              type: {
                type: "string",
              },
              mode: {
                type: "string",
              },
              internalMappings: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    addressSpace: {
                      type: "string",
                    },
                    portRange: {
                      type: "string",
                    },
                  },
                },
              },
              externalMappings: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              ipConfigurationId: {
                type: "string",
              },
            },
          },
          name: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          type: {
            type: "string",
          },
        },
      },
    },
  },
};

export default VirtualNetworkGatewayNatRules_Get;
