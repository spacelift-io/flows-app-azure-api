import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Provider_GetAvailableStacks: AppBlock = {
  name: "Provider / Get Available Stacks",
  description:
    "Description for Get available application frameworks and their versions",
  category: "Provider",
  inputs: {
    default: {
      config: {
        osTypeSelected: {
          name: "OS Type Selected",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/providers/Microsoft.Web/availableStacks` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.osTypeSelected
            ? `&osTypeSelected=${input.event.inputConfig.osTypeSelected}`
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
                properties: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    display: {
                      type: "string",
                    },
                    dependency: {
                      type: "string",
                    },
                    majorVersions: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          displayVersion: {
                            type: "string",
                          },
                          runtimeVersion: {
                            type: "string",
                          },
                          isDefault: {
                            type: "boolean",
                          },
                          minorVersions: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                displayVersion: {
                                  type: "string",
                                },
                                runtimeVersion: {
                                  type: "string",
                                },
                                isDefault: {
                                  type: "boolean",
                                },
                                isRemoteDebuggingEnabled: {
                                  type: "boolean",
                                },
                              },
                            },
                          },
                          applicationInsights: {
                            type: "boolean",
                          },
                          isPreview: {
                            type: "boolean",
                          },
                          isDeprecated: {
                            type: "boolean",
                          },
                          isHidden: {
                            type: "boolean",
                          },
                          appSettingsDictionary: {
                            type: "object",
                            additionalProperties: true,
                          },
                          siteConfigPropertiesDictionary: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                    },
                    frameworks: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: {
                            type: "object",
                            additionalProperties: true,
                          },
                          display: {
                            type: "object",
                            additionalProperties: true,
                          },
                          dependency: {
                            type: "object",
                            additionalProperties: true,
                          },
                          majorVersions: {
                            type: "object",
                            additionalProperties: true,
                          },
                          frameworks: {
                            type: "object",
                            additionalProperties: true,
                          },
                          isDeprecated: {
                            type: "array",
                            items: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                      },
                    },
                    isDeprecated: {
                      type: "object",
                      additionalProperties: true,
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

export default Provider_GetAvailableStacks;
