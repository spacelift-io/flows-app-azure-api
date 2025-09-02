import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetOperationDetails: AppBlock = {
  name: "Get Operation Details",
  description: "Gets the state of a long running operation.",
  category: "General",
  inputs: {
    default: {
      config: {
        snapshot: {
          name: "Snapshot",
          description: "Snapshot identifier for the long running operation.",
          type: "string",
          required: true,
        },
        x_ms_client_request_id: {
          name: "Client Request ID",
          description:
            "An opaque, globally-unique, client-generated string identifier for the request.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }

        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/operations` +
          (input.event.inputConfig.snapshot
            ? `?snapshot=${input.event.inputConfig.snapshot}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "GET",
          undefined,
          additionalHeaders,
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
          id: {
            type: "string",
          },
          status: {
            type: "string",
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
              target: {
                type: "string",
              },
              details: {
                type: "array",
                items: {
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
                    target: {
                      type: "object",
                      additionalProperties: true,
                    },
                    details: {
                      type: "object",
                      additionalProperties: true,
                    },
                    innererror: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                        },
                        innererror: {
                          type: "object",
                          properties: {
                            code: {
                              type: "object",
                              additionalProperties: true,
                            },
                            innererror: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                      },
                    },
                  },
                  required: ["code", "message"],
                },
              },
              innererror: {
                type: "object",
                additionalProperties: true,
              },
            },
            required: ["code", "message"],
          },
        },
        required: ["id", "status"],
      },
    },
  },
};

export default GetOperationDetails;
