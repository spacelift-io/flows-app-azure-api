import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const MetricDefinitions_ListAtSubscriptionScope: AppBlock = {
  name: "Metric Definitions / List At Subscription Scope",
  description: "Lists the metric definitions for the subscription.",
  category: "Metric Definitions",
  inputs: {
    default: {
      config: {
        region: {
          name: "Region",
          description: "The region where the metrics you want reside.",
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
        metricnamespace: {
          name: "Metricnamespace",
          description: "Metric namespace where the metrics you want reside.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Insights/metricDefinitions` +
          "?api-version=2024-02-01" +
          (input.event.inputConfig.region
            ? `&region=${input.event.inputConfig.region}`
            : "") +
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

export default MetricDefinitions_ListAtSubscriptionScope;
