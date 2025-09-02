import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const MetricDefinitions_List: AppBlock = {
  name: "Metric Definitions / List",
  description: "Lists the metric definitions for the resource.",
  category: "Metric Definitions",
  inputs: {
    default: {
      config: {
        resourceUri: {
          name: "Resource Uri",
          type: "string",
          required: true,
        },
        metricnamespace: {
          name: "Metricnamespace",
          description: "Metric namespace where the metrics you want reside.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/${input.event.inputConfig.resourceUri}/providers/Microsoft.Insights/metricDefinitions` +
          "?api-version=2024-02-01" +
          (input.event.inputConfig.metricnamespace
            ? `&metricnamespace=${input.event.inputConfig.metricnamespace}`
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
                isDimensionRequired: {
                  type: "boolean",
                },
                resourceId: {
                  type: "string",
                },
                namespace: {
                  type: "string",
                },
                name: {
                  type: "object",
                  properties: {
                    value: {
                      type: "string",
                    },
                    localizedValue: {
                      type: "string",
                    },
                  },
                  required: ["value"],
                },
                displayDescription: {
                  type: "string",
                },
                category: {
                  type: "string",
                },
                metricClass: {
                  type: "string",
                },
                unit: {
                  type: "string",
                },
                primaryAggregationType: {
                  type: "string",
                },
                supportedAggregationTypes: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                metricAvailabilities: {
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
                    },
                  },
                },
                id: {
                  type: "string",
                },
                dimensions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      value: {
                        type: "object",
                        additionalProperties: true,
                      },
                      localizedValue: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    required: ["value"],
                  },
                },
              },
            },
          },
        },
        required: ["value"],
      },
    },
  },
};

export default MetricDefinitions_List;
