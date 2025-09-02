import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Operations_List: AppBlock = {
  name: "Operations / List",
  description: "Lists all of the available Storage Rest API operations.",
  category: "Operations",
  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/providers/Microsoft.Storage/operations` +
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
                display: {
                  type: "object",
                  properties: {
                    provider: {
                      type: "string",
                    },
                    resource: {
                      type: "string",
                    },
                    operation: {
                      type: "string",
                    },
                    description: {
                      type: "string",
                    },
                  },
                },
                origin: {
                  type: "string",
                },
                properties: {
                  type: "object",
                  properties: {
                    serviceSpecification: {
                      type: "object",
                      properties: {
                        metricSpecifications: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                              },
                              displayName: {
                                type: "string",
                              },
                              displayDescription: {
                                type: "string",
                              },
                              unit: {
                                type: "string",
                              },
                              dimensions: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    name: {
                                      type: "string",
                                    },
                                    displayName: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                              aggregationType: {
                                type: "string",
                              },
                              fillGapWithZero: {
                                type: "boolean",
                              },
                              category: {
                                type: "string",
                              },
                              resourceIdDimensionNameOverride: {
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
        },
      },
    },
  },
};

export default Operations_List;
