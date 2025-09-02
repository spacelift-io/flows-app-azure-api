import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Query_ResourceExecute: AppBlock = {
  name: "Query / Resource Execute",
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
        body: {
          name: "Body",
          description:
            "The Analytics query. Learn more about the [Analytics query syntax](https://azure.microsoft.com/documentation/articles/app-insights-analytics-reference/)",
          type: {
            type: "object",
            properties: {
              query: {
                type: "string",
              },
              timespan: {
                type: "string",
              },
              workspaces: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: ["query"],
          },
          required: true,
        },
        Prefer: {
          name: "Prefer",
          description:
            "Optional. The prefer header to set server timeout, query statistics and visualization information.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.body;
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.Prefer) {
          additionalHeaders["Prefer"] = String(input.event.inputConfig.Prefer);
        }

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.resourceId}/query`;

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
          requestBody,
          additionalHeaders,
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

export default Query_ResourceExecute;
