import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CertificateRegistrationProvider_ListOperations: AppBlock = {
  name: "Certificate Registration Provider / List Operations",
  description:
    "Description for Implements Csm operations Api to exposes the list of available Csm Apis under the resource provider",
  category: "Certificate Registration Provider",
  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/providers/Microsoft.CertificateRegistration/operations` +
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
                              supportsInstanceLevelAggregation: {
                                type: "boolean",
                              },
                              enableRegionalMdmAccount: {
                                type: "boolean",
                              },
                              sourceMdmAccount: {
                                type: "string",
                              },
                              sourceMdmNamespace: {
                                type: "string",
                              },
                              metricFilterPattern: {
                                type: "string",
                              },
                              fillGapWithZero: {
                                type: "boolean",
                              },
                              isInternal: {
                                type: "boolean",
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
                                    toBeExportedForShoebox: {
                                      type: "boolean",
                                    },
                                  },
                                },
                              },
                              category: {
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
                                    blobDuration: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                              supportedTimeGrainTypes: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              supportedAggregationTypes: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
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
                              logFilterPattern: {
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
        required: ["value"],
      },
    },
  },
};

export default CertificateRegistrationProvider_ListOperations;
