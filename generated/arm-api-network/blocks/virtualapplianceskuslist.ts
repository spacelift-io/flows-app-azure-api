import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualApplianceSkus_List: AppBlock = {
  name: "Virtual Appliance Skus / List",
  description: "List all SKUs available for a virtual appliance.",
  category: "Virtual Appliance Skus",
  inputs: {
    default: {
      config: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/networkVirtualApplianceSkus` +
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
          value: {
            type: "array",
            items: {
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default VirtualApplianceSkus_List;
