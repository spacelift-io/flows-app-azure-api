import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Operations_List: AppBlock = {
  name: "Operations / List",
  description: "Lists the operations available from this provider.",
  category: "Operations",
  inputs: {
    default: {
      config: {
        $skipToken: {
          name: "Skip Token",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/providers/Microsoft.AppConfiguration/operations` +
          "?api-version=2024-06-01" +
          (input.event.inputConfig.$skipToken
            ? `&$skipToken=${input.event.inputConfig.$skipToken}`
            : "");

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
                isDataAction: {
                  type: "boolean",
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
                        logSpecifications: {
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
                              blobDuration: {
                                type: "string",
                              },
                            },
                          },
                        },
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
                              aggregationType: {
                                type: "string",
                              },
                              internalMetricName: {
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
                                    internalName: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                              fillGapWithZero: {
                                type: "boolean",
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Operations_List;
