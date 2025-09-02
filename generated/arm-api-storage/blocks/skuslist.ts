import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Skus_List: AppBlock = {
  name: "Skus / List",
  description:
    "Lists the available SKUs supported by Microsoft.Storage for given subscription.",
  category: "Skus",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Storage/skus` +
          "?api-version=2025-01-01";

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
                name: {
                  type: "string",
                },
                tier: {
                  type: "string",
                },
                resourceType: {
                  type: "string",
                },
                kind: {
                  type: "string",
                },
                locations: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                locationInfo: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      location: {
                        type: "string",
                      },
                      zones: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                    },
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
                    },
                  },
                },
                restrictions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                      },
                      values: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      reasonCode: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              required: ["name"],
            },
          },
        },
      },
    },
  },
};

export default Skus_List;
