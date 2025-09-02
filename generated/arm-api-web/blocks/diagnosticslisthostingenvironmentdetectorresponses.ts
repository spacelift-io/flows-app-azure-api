import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Diagnostics_ListHostingEnvironmentDetectorResponses: AppBlock = {
  name: "Diagnostics / List Hosting Environment Detector Responses",
  description: "Description for List Hosting Environment Detector Responses",
  category: "Diagnostics",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
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
        resourceGroupName: {
          name: "Resource Group Name",
          description:
            "Azure resource group name (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/${input.event.inputConfig.name}/detectors` +
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
                properties: {
                  type: "object",
                  properties: {
                    metadata: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        name: {
                          type: "string",
                        },
                        description: {
                          type: "string",
                        },
                        author: {
                          type: "string",
                        },
                        category: {
                          type: "string",
                        },
                        supportTopicList: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                              pesId: {
                                type: "string",
                              },
                            },
                          },
                        },
                        analysisType: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        type: {
                          type: "string",
                        },
                        score: {
                          type: "number",
                        },
                      },
                    },
                    dataset: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          table: {
                            type: "object",
                            properties: {
                              tableName: {
                                type: "string",
                              },
                              columns: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    columnName: {
                                      type: "string",
                                    },
                                    dataType: {
                                      type: "string",
                                    },
                                    columnType: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                              rows: {
                                type: "array",
                                items: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                          },
                          renderingProperties: {
                            type: "object",
                            properties: {
                              type: {
                                type: "string",
                              },
                              title: {
                                type: "string",
                              },
                              description: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                    },
                    status: {
                      type: "object",
                      properties: {
                        message: {
                          type: "string",
                        },
                        statusId: {
                          type: "string",
                        },
                      },
                    },
                    dataProvidersMetadata: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          providerName: {
                            type: "string",
                          },
                          propertyBag: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                key: {
                                  type: "string",
                                },
                                value: {
                                  type: "object",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    suggestedUtterances: {
                      type: "object",
                      properties: {
                        query: {
                          type: "string",
                        },
                        results: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              sampleUtterance: {
                                type: "object",
                                properties: {
                                  text: {
                                    type: "string",
                                  },
                                  links: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                  qid: {
                                    type: "string",
                                  },
                                },
                              },
                              score: {
                                type: "number",
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

export default Diagnostics_ListHostingEnvironmentDetectorResponses;
