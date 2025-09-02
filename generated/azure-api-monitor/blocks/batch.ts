import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Batch: AppBlock = {
  name: "Batch",
  description: "Lists the metric values for multiple resources.",
  category: "General",
  inputs: {
    default: {
      config: {
        metricnamespace: {
          name: "Metricnamespace",
          description:
            "Metric namespace that contains the requested metric names.",
          type: "string",
          required: true,
        },
        metricnames: {
          name: "Metricnames",
          description:
            "The names of the metrics (comma separated) to retrieve.",
          type: {
            type: "array",
          },
          required: true,
        },
        batchRequest: {
          name: "Batch Request",
          description: "Metrics batch body including the list of resource ids",
          type: {
            type: "object",
            properties: {
              resourceids: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
          required: true,
        },
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
        starttime: {
          name: "Start Time",
          type: "string",
          required: false,
        },
        endtime: {
          name: "End Time",
          description:
            "The end time of the query. It is a string in the format 'yyyy-MM-ddTHH:mm:ss.fffZ'.",
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
        filter: {
          name: "Filter",
          description:
            "The filter is used to reduce the set of metric data returned.<br>Example:<br>Metric contains metadata A, B and C.<br>- Return all time series of C where A = a1 and B = b1 or b2<br>**filter=A eq ‘a1’ and B eq ‘b1’ or B eq ‘b2’ and C eq ‘*’**<br>- Invalid variant:<br>**filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘*’ or B = ‘b2’**<br>This is invalid because the logical or operator cannot separate two different metadata names.<br>- Return all time series where A = a1, B = b1 and C = c1:<br>**filter=A eq ‘a1’ and B eq ‘b1’ and C eq ‘c1’**<br>- Return all time series where A = a1<br>**filter=A eq ‘a1’ and B eq ‘*’ and C eq ‘*’**.",
          type: "string",
          required: false,
        },
        rollupby: {
          name: "Rollupby",
          description:
            "Dimension name(s) to rollup results by. For example if you only want to see metric values with a filter like 'City eq Seattle or City eq Tacoma' but don't want to see separate values for each city, you can specify 'RollUpBy=City' to see the results for Seattle and Tacoma rolled up into one timeseries.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.batchRequest;

        const url =
          `${input.event.inputConfig.endpoint || input.app.config.endpoint}/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/metrics:getBatch` +
          (input.event.inputConfig.starttime
            ? `?starttime=${input.event.inputConfig.starttime}`
            : "") +
          (input.event.inputConfig.endtime
            ? `&endtime=${input.event.inputConfig.endtime}`
            : "") +
          (input.event.inputConfig.interval
            ? `&interval=${input.event.inputConfig.interval}`
            : "") +
          (input.event.inputConfig.metricnamespace
            ? `&metricnamespace=${input.event.inputConfig.metricnamespace}`
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
          (input.event.inputConfig.filter
            ? `&filter=${input.event.inputConfig.filter}`
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
          values: {
            type: "array",
            items: {
              type: "object",
              properties: {
                starttime: {
                  type: "string",
                },
                endtime: {
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
                resourceid: {
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
              required: ["starttime", "endtime", "value"],
            },
          },
        },
      },
    },
  },
};

export default Batch;
