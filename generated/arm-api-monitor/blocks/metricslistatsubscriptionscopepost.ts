import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Metrics_ListAtSubscriptionScopePost: AppBlock = {
  name: "Metrics / List At Subscription Scope Post",
  description:
    "**Lists the metric data for a subscription**. Parameters can be specified on either query params or the body. This API used the [default ARM throttling limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/request-limits-and-throttling).",
  category: "Metrics",
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
        timespan: {
          name: "Timespan",
          description:
            "The timespan of the query. It is a string with the following format 'startDateTime_ISO/endDateTime_ISO'.",
          type: "string",
          required: false,
        },
        interval: {
          name: "Interval",
          description:
            "The interval (i.e. timegrain) of the query in ISO 8601 duration format. Defaults to PT1M. Special case for 'FULL' value that returns single datapoint for entire time span requested. *Examples: PT15M, PT1H, P1D, FULL*",
          type: "string",
          required: false,
        },
        metricnames: {
          name: "Metricnames",
          description:
            "The names of the metrics (comma separated) to retrieve. Limit 20 metrics.",
          type: "string",
          required: false,
        },
        aggregation: {
          name: "Aggregation",
          description:
            "The list of aggregation types (comma separated) to retrieve. *Examples: average, minimum, maximum*",
          type: "string",
          required: false,
        },
        top: {
          name: "Top",
          description:
            "The maximum number of records to retrieve per resource ID in the request. Valid only if filter is specified. Defaults to 10.",
          type: "number",
          required: false,
        },
        orderby: {
          name: "Orderby",
          description:
            "The aggregation to use for sorting results and the direction of the sort. Only one order can be specified. *Examples: sum asc*",
          type: "string",
          required: false,
        },
        $filter: {
          name: "Filter",
          description:
            "The **$filter** is used to reduce the set of metric data returned.<br>Example:<br>Metric contains metadata A, B and C.<br>- Return all time series of C where A = a1 and B = b1 or b2<br>**$filter=A eq ‘a1’ and B eq ‘b1’ or B eq ‘b2’ and C eq ‘*’**<br>- Invalid variant:<br>**$filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘*’ or B = ‘b2’**<br>This is invalid because the logical or operator cannot separate two different metadata names.<br>- Return all time series where A = a1, B = b1 and C = c1:<br>**$filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘c1’**<br>- Return all time series where A = a1<br>**$filter=A eq ‘a1’ and B eq ‘*’ and C eq ‘*’**.",
          type: "string",
          required: false,
        },
        resultType: {
          name: "Result Type",
          description:
            "Reduces the set of data collected. The syntax allowed depends on the operation. See the operation's description for details.",
          type: "string",
          required: false,
        },
        metricnamespace: {
          name: "Metricnamespace",
          description: "Metric namespace where the metrics you want reside.",
          type: "string",
          required: false,
        },
        AutoAdjustTimegrain: {
          name: "Auto Adjust Timegrain",
          type: "boolean",
          required: false,
        },
        ValidateDimensions: {
          name: "Validate Dimensions",
          description: "Unique identifier",
          type: "boolean",
          required: false,
        },
        rollupby: {
          name: "Rollupby",
          description:
            "Dimension name(s) to rollup results by. For example if you only want to see metric values with a filter like 'City eq Seattle or City eq Tacoma' but don't want to see separate values for each city, you can specify 'RollUpBy=City' to see the results for Seattle and Tacoma rolled up into one timeseries.",
          type: "string",
          required: false,
        },
        body: {
          name: "Body",
          description: "Body (base64-encoded)",
          type: {
            type: "object",
            properties: {
              timespan: {
                type: "string",
              },
              interval: {
                type: "string",
              },
              metricNames: {
                type: "string",
              },
              aggregation: {
                type: "string",
              },
              filter: {
                type: "string",
              },
              top: {
                type: "number",
              },
              orderBy: {
                type: "string",
              },
              rollUpBy: {
                type: "string",
              },
              resultType: {
                type: "string",
              },
              metricNamespace: {
                type: "string",
              },
              autoAdjustTimegrain: {
                type: "boolean",
              },
              validateDimensions: {
                type: "boolean",
              },
            },
          },
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.body;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Insights/metrics` +
          "?api-version=2024-02-01" +
          (input.event.inputConfig.region
            ? `&region=${input.event.inputConfig.region}`
            : "") +
          (input.event.inputConfig.timespan
            ? `&timespan=${input.event.inputConfig.timespan}`
            : "") +
          (input.event.inputConfig.interval
            ? `&interval=${input.event.inputConfig.interval}`
            : "") +
          (input.event.inputConfig.metricnames
            ? `&metricnames=${input.event.inputConfig.metricnames}`
            : "") +
          (input.event.inputConfig.aggregation
            ? `&aggregation=${input.event.inputConfig.aggregation}`
            : "") +
          (input.event.inputConfig.top
            ? `&top=${input.event.inputConfig.top}`
            : "") +
          (input.event.inputConfig.orderby
            ? `&orderby=${input.event.inputConfig.orderby}`
            : "") +
          (input.event.inputConfig.$filter
            ? `&$filter=${input.event.inputConfig.$filter}`
            : "") +
          (input.event.inputConfig.resultType
            ? `&resultType=${input.event.inputConfig.resultType}`
            : "") +
          (input.event.inputConfig.metricnamespace
            ? `&metricnamespace=${input.event.inputConfig.metricnamespace}`
            : "") +
          (input.event.inputConfig.AutoAdjustTimegrain
            ? `&AutoAdjustTimegrain=${input.event.inputConfig.AutoAdjustTimegrain}`
            : "") +
          (input.event.inputConfig.ValidateDimensions
            ? `&ValidateDimensions=${input.event.inputConfig.ValidateDimensions}`
            : "") +
          (input.event.inputConfig.rollupby
            ? `&rollupby=${input.event.inputConfig.rollupby}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
          requestBody,
          undefined,
          input.event.inputConfig.isBinaryData || false,
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
          cost: {
            type: "number",
          },
          timespan: {
            type: "string",
          },
          interval: {
            type: "string",
          },
          namespace: {
            type: "string",
          },
          resourceregion: {
            type: "string",
          },
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                type: {
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
                errorCode: {
                  type: "string",
                },
                errorMessage: {
                  type: "string",
                },
                unit: {
                  type: "string",
                },
                timeseries: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      metadatavalues: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: {
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
                            value: {
                              type: "string",
                            },
                          },
                        },
                      },
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            timeStamp: {
                              type: "string",
                            },
                            average: {
                              type: "number",
                            },
                            minimum: {
                              type: "number",
                            },
                            maximum: {
                              type: "number",
                            },
                            total: {
                              type: "number",
                            },
                            count: {
                              type: "number",
                            },
                          },
                          required: ["timeStamp"],
                        },
                      },
                    },
                  },
                },
              },
              required: ["id", "type", "name", "unit", "timeseries"],
            },
          },
        },
        required: ["timespan", "value"],
      },
    },
  },
};

export default Metrics_ListAtSubscriptionScopePost;
