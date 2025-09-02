import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Diagnostics_ExecuteSiteDetector: AppBlock = {
  name: "Diagnostics / Execute Site Detector",
  description: "Description for Execute Detector",
  category: "Diagnostics",
  inputs: {
    default: {
      config: {
        siteName: {
          name: "Site Name",
          description: "Name of the site",
          type: "string",
          required: true,
        },
        diagnosticCategory: {
          name: "Diagnostic Category",
          type: "string",
          required: true,
        },
        detectorName: {
          name: "Detector Name",
          description: "Name of the detector",
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
        startTime: {
          name: "Start Time",
          type: "string",
          required: false,
        },
        endTime: {
          name: "End Time",
          type: "string",
          required: false,
        },
        timeGrain: {
          name: "Time Grain",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.siteName}/diagnostics/${input.event.inputConfig.diagnosticCategory}/detectors/${input.event.inputConfig.detectorName}/execute` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.startTime
            ? `&startTime=${input.event.inputConfig.startTime}`
            : "") +
          (input.event.inputConfig.endTime
            ? `&endTime=${input.event.inputConfig.endTime}`
            : "") +
          (input.event.inputConfig.timeGrain
            ? `&timeGrain=${input.event.inputConfig.timeGrain}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          properties: {
            type: "object",
            properties: {
              startTime: {
                type: "string",
              },
              endTime: {
                type: "string",
              },
              issueDetected: {
                type: "boolean",
              },
              detectorDefinition: {
                type: "object",
                properties: {
                  displayName: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  rank: {
                    type: "number",
                  },
                  isEnabled: {
                    type: "boolean",
                  },
                },
              },
              metrics: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    unit: {
                      type: "string",
                    },
                    startTime: {
                      type: "string",
                    },
                    endTime: {
                      type: "string",
                    },
                    timeGrain: {
                      type: "string",
                    },
                    values: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          timestamp: {
                            type: "string",
                          },
                          roleInstance: {
                            type: "string",
                          },
                          total: {
                            type: "number",
                          },
                          maximum: {
                            type: "number",
                          },
                          minimum: {
                            type: "number",
                          },
                          isAggregated: {
                            type: "boolean",
                          },
                        },
                      },
                    },
                  },
                },
              },
              abnormalTimePeriods: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    startTime: {
                      type: "string",
                    },
                    endTime: {
                      type: "string",
                    },
                    message: {
                      type: "string",
                    },
                    source: {
                      type: "string",
                    },
                    priority: {
                      type: "number",
                    },
                    metaData: {
                      type: "array",
                      items: {
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
                    },
                    type: {
                      type: "string",
                    },
                    solutions: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "number",
                          },
                          displayName: {
                            type: "string",
                          },
                          order: {
                            type: "number",
                          },
                          description: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                          data: {
                            type: "array",
                            items: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                          },
                          metadata: {
                            type: "array",
                            items: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              data: {
                type: "array",
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              responseMetaData: {
                type: "object",
                properties: {
                  dataSource: {
                    type: "object",
                    properties: {
                      instructions: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      dataSourceUri: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: true,
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

export default Diagnostics_ExecuteSiteDetector;
