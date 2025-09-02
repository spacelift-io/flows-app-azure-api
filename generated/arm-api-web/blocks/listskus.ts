import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ListSkus: AppBlock = {
  name: "List Skus",
  description: "Description for List all SKUs.",
  category: "General",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Web/skus` +
          "?api-version=2024-11-01";

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
          resourceType: {
            type: "string",
          },
          skus: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                tier: {
                  type: "string",
                },
                size: {
                  type: "string",
                },
                family: {
                  type: "string",
                },
                capacity: {
                  type: "object",
                  properties: {
                    minimum: {
                      type: "integer",
                    },
                    maximum: {
                      type: "integer",
                    },
                    elasticMaximum: {
                      type: "integer",
                    },
                    default: {
                      type: "integer",
                    },
                    scaleType: {
                      type: "string",
                    },
                  },
                },
                locations: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                capabilities: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      value: {
                        type: "string",
                      },
                      reason: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default ListSkus;
