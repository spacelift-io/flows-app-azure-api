import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ResourceSkus_List: AppBlock = {
  name: "Resource Skus / List",
  description:
    "Gets the list of Microsoft.Compute SKUs available for your Subscription.",
  category: "Resource Skus",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/skus` +
          "?api-version=2017-09-01";

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
                resourceType: {
                  type: "string",
                },
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
                kind: {
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
                apiVersions: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                costs: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      meterID: {
                        type: "string",
                      },
                      quantity: {
                        type: "integer",
                      },
                      extendedUnit: {
                        type: "string",
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
                      restrictionInfo: {
                        type: "object",
                        properties: {
                          locations: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          zones: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                        },
                      },
                      reasonCode: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default ResourceSkus_List;
