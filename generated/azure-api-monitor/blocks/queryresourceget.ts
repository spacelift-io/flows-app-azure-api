import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Query_ResourceGet: AppBlock = {
  name: "Query / Resource Get",
  description:
    "Executes an Analytics query for data in the context of a resource. [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/azure-resource-queries) is an example for using POST with an Analytics query.",
  category: "Query",
  inputs: {
    default: {
      config: {
        resourceId: {
          name: "Resource ID",
          description: "Unique identifier",
          type: "string",
          required: true,
        },
        query: {
          name: "Query",
          description:
            "The Analytics query. Learn more about the [Analytics query syntax](https://azure.microsoft.com/documentation/articles/app-insights-analytics-reference/)",
          type: "string",
          required: true,
        },
        timespan: {
          name: "Timespan",
          description:
            "Optional. The timespan over which to query data. This is an ISO8601 time period value.  This timespan is applied in addition to any that are specified in the query expression.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.resourceId}/query` +
          (input.event.inputConfig.query
            ? `?query=${input.event.inputConfig.query}`
            : "") +
          (input.event.inputConfig.timespan
            ? `&timespan=${input.event.inputConfig.timespan}`
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
          tables: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                columns: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      type: {
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
                      type: "object",
                    },
                  },
                },
              },
              required: ["name", "columns", "rows"],
            },
          },
          statistics: {
            type: "object",
            properties: {},
          },
          render: {
            type: "object",
            properties: {},
          },
          error: {
            type: "object",
            properties: {
              code: {
                type: "string",
              },
              message: {
                type: "string",
              },
              details: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                    },
                    message: {
                      type: "string",
                    },
                    target: {
                      type: "string",
                    },
                    value: {
                      type: "string",
                    },
                    resources: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    additionalProperties: {
                      type: "object",
                    },
                  },
                  required: ["code", "message"],
                },
              },
              innererror: {
                type: "object",
                properties: {
                  code: {
                    type: "object",
                    additionalProperties: true,
                  },
                  message: {
                    type: "object",
                    additionalProperties: true,
                  },
                  details: {
                    type: "object",
                    additionalProperties: true,
                  },
                  innererror: {
                    type: "object",
                    additionalProperties: true,
                  },
                  additionalProperties: {
                    type: "object",
                  },
                },
                required: ["code", "message"],
              },
              additionalProperties: {
                type: "object",
                additionalProperties: true,
              },
            },
            required: ["code", "message"],
          },
        },
        required: ["tables"],
      },
    },
  },
};

export default Query_ResourceGet;
