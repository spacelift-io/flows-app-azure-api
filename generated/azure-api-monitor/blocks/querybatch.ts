import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Query_Batch: AppBlock = {
  name: "Query / Batch",
  description:
    "Executes a batch of Analytics queries for data. [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/batch-queries) is an example for using POST with an Analytics query.",
  category: "Query",
  inputs: {
    default: {
      config: {
        body: {
          name: "Body",
          description: "The batch request body",
          type: {
            type: "object",
            properties: {
              requests: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    headers: {
                      type: "object",
                      additionalProperties: true,
                    },
                    body: {
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
                    path: {
                      type: "string",
                    },
                    method: {
                      type: "string",
                    },
                    workspace: {
                      type: "string",
                    },
                  },
                  required: ["workspace", "body", "id"],
                },
              },
            },
            required: ["requests"],
          },
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.body;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/$batch`;

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
          responses: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                status: {
                  type: "integer",
                },
                body: {
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
                },
                headers: {
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
};

export default Query_Batch;
