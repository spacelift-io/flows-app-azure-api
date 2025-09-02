import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkInterfaces_GetEffectiveRouteTable: AppBlock = {
  name: "Network Interfaces / Get Effective Route Table",
  description: "Gets all route tables applied to a network interface.",
  category: "Network Interfaces",
  inputs: {
    default: {
      config: {
        networkInterfaceName: {
          name: "Network Interface Name",
          description: "Name of the network interface",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkInterfaces/${input.event.inputConfig.networkInterfaceName}/effectiveRouteTable` +
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
                name: {
                  type: "string",
                },
                disableBgpRoutePropagation: {
                  type: "boolean",
                },
                source: {
                  type: "string",
                },
                state: {
                  type: "string",
                },
                addressPrefix: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                nextHopIpAddress: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                nextHopType: {
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

export default NetworkInterfaces_GetEffectiveRouteTable;
