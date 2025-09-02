import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Provider_GetWebAppStacks: AppBlock = {
  name: "Provider / Get Web App Stacks",
  description:
    "Description for Get available Web app frameworks and their versions",
  category: "Provider",
  inputs: {
    default: {
      config: {
        stackOsType: {
          name: "Stack OS Type",
          description: "Stack OS Type",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/providers/Microsoft.Web/webAppStacks` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.stackOsType
            ? `&stackOsType=${input.event.inputConfig.stackOsType}`
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
                location: {
                  type: "string",
                },
                properties: {
                  type: "object",
                  properties: {
                    displayText: {
                      type: "string",
                    },
                    value: {
                      type: "string",
                    },
                    majorVersions: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          displayText: {
                            type: "string",
                          },
                          value: {
                            type: "string",
                          },
                          minorVersions: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                displayText: {
                                  type: "string",
                                },
                                value: {
                                  type: "string",
                                },
                                stackSettings: {
                                  type: "object",
                                  properties: {
                                    linuxRuntimeSettings: {
                                      type: "object",
                                      properties: {
                                        runtimeVersion: {
                                          type: "string",
                                        },
                                        remoteDebuggingSupported: {
                                          type: "boolean",
                                        },
                                        appInsightsSettings: {
                                          type: "object",
                                          properties: {
                                            isSupported: {
                                              type: "boolean",
                                            },
                                            isDefaultOff: {
                                              type: "boolean",
                                            },
                                          },
                                        },
                                        gitHubActionSettings: {
                                          type: "object",
                                          properties: {
                                            isSupported: {
                                              type: "boolean",
                                            },
                                            supportedVersion: {
                                              type: "string",
                                            },
                                          },
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
                                        endOfLifeDate: {
                                          type: "string",
                                        },
                                        isAutoUpdate: {
                                          type: "boolean",
                                        },
                                        isEarlyAccess: {
                                          type: "boolean",
                                        },
                                      },
                                    },
                                    windowsRuntimeSettings: {
                                      type: "object",
                                      properties: {
                                        runtimeVersion: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        remoteDebuggingSupported: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        appInsightsSettings: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        gitHubActionSettings: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        isPreview: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        isDeprecated: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        isHidden: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        endOfLifeDate: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        isAutoUpdate: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        isEarlyAccess: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                    },
                                    linuxContainerSettings: {
                                      type: "object",
                                      properties: {
                                        java11Runtime: {
                                          type: "string",
                                        },
                                        java8Runtime: {
                                          type: "string",
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
                                        endOfLifeDate: {
                                          type: "string",
                                        },
                                        isAutoUpdate: {
                                          type: "boolean",
                                        },
                                        isEarlyAccess: {
                                          type: "boolean",
                                        },
                                      },
                                    },
                                    windowsContainerSettings: {
                                      type: "object",
                                      properties: {
                                        javaContainer: {
                                          type: "string",
                                        },
                                        javaContainerVersion: {
                                          type: "string",
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
                                        endOfLifeDate: {
                                          type: "string",
                                        },
                                        isAutoUpdate: {
                                          type: "boolean",
                                        },
                                        isEarlyAccess: {
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
                    preferredOs: {
                      type: "string",
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

export default Provider_GetWebAppStacks;
