import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualWans_Get: AppBlock = {
  name: "Virtual Wans / Get",
  description: "Retrieves the details of a VirtualWAN.",
  category: "Virtual Wans",
  inputs: {
    default: {
      config: {
        VirtualWANName: {
          name: "Virtual Wan Name",
          description: "Name of the virtual wan",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualWans/${input.event.inputConfig.VirtualWANName}` +
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
              disableVpnEncryption: {
                type: "boolean",
              },
              virtualHubs: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                  },
                },
              },
              vpnSites: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              allowBranchToBranchTraffic: {
                type: "boolean",
              },
              allowVnetToVnetTraffic: {
                type: "boolean",
              },
              office365LocalBreakoutCategory: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
              type: {
                type: "string",
              },
            },
          },
          etag: {
            type: "string",
          },
        },
        required: ["location"],
      },
    },
  },
};

export default VirtualWans_Get;
