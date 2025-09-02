import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Operations_List: AppBlock = {
  name: "Operations / List",
  description:
    "Lists all of the available Azure Container Registry REST API operations.",
  category: "Operations",
  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/providers/Microsoft.ContainerRegistry/operations` +
          "?api-version=2025-04-01";

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
                origin: {
                  type: "string",
                },
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
                              internalMetricName: {
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
                isDataAction: {
                  type: "boolean",
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
