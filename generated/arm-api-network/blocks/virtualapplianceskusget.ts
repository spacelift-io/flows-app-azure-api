import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualApplianceSkus_Get: AppBlock = {
  name: "Virtual Appliance Skus / Get",
  description:
    "Retrieves a single available sku for network virtual appliance.",
  category: "Virtual Appliance Skus",
  inputs: {
    default: {
      config: {
        skuName: {
          name: "Sku Name",
          description: "Name of the sku",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/networkVirtualApplianceSkus/${input.event.inputConfig.skuName}` +
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
              vendor: {
                type: "string",
              },
              availableVersions: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              availableScaleUnits: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    scaleUnit: {
                      type: "string",
                    },
                    instanceCount: {
                      type: "integer",
                    },
                  },
                },
              },
            },
          },
          etag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default VirtualApplianceSkus_Get;
