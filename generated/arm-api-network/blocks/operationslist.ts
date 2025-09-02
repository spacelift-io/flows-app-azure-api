import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Operations_List: AppBlock = {
  name: "Operations / List",
  description: "Lists all of the available Network Rest API operations.",
  category: "Operations",
  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/providers/Microsoft.Network/operations` +
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
                              aggregationType: {
                                type: "string",
                              },
                              availabilities: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    timeGrain: {
                                      type: "string",
                                    },
                                    retention: {
                                      type: "string",
                                    },
                                    blobDuration: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                              enableRegionalMdmAccount: {
                                type: "boolean",
                              },
                              fillGapWithZero: {
                                type: "boolean",
                              },
                              metricFilterPattern: {
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
                              isInternal: {
                                type: "boolean",
                              },
                              sourceMdmAccount: {
                                type: "string",
                              },
                              sourceMdmNamespace: {
                                type: "string",
                              },
                              resourceIdDimensionNameOverride: {
                                type: "string",
                              },
                            },
                          },
                        },
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
