import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetSnapshot: AppBlock = {
  name: "Get Snapshot",
  description: "Gets a single key-value snapshot.",
  category: "General",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        $Select: {
          name: "Select",
          description:
            "Used to select what fields are present in the returned resource(s).",
          type: {
            type: "array",
          },
          required: false,
        },
        Sync_Token: {
          name: "Sync Token",
          description:
            "Used to guarantee real-time consistency between requests.",
          type: "string",
          required: false,
        },
        If_Match: {
          name: "If Match",
          description:
            "Used to perform an operation only if the targeted resource's etag matches the value provided.",
          type: "string",
          required: false,
        },
        If_None_Match: {
          name: "If None Match",
          description:
            "Used to perform an operation only if the targeted resource's etag does not match the value provided.",
          type: "string",
          required: false,
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
        if (input.event.inputConfig.Sync_Token) {
          additionalHeaders["Sync-Token"] = String(
            input.event.inputConfig.Sync_Token,
          );
        }
        if (input.event.inputConfig.If_Match) {
          additionalHeaders["If-Match"] = String(
            input.event.inputConfig.If_Match,
          );
        }
        if (input.event.inputConfig.If_None_Match) {
          additionalHeaders["If-None-Match"] = String(
            input.event.inputConfig.If_None_Match,
          );
        }
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }

        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/snapshots/${input.event.inputConfig.name}` +
          (input.event.inputConfig.$Select
            ? `?$Select=${input.event.inputConfig.$Select}`
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
          name: {
            type: "string",
          },
          status: {
            type: "string",
          },
          filters: {
            type: "array",
            items: {
              type: "object",
              properties: {
                key: {
                  type: "string",
                },
                label: {
                  type: "string",
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
              required: ["key"],
            },
          },
          composition_type: {
            type: "string",
          },
          created: {
            type: "string",
          },
          expires: {
            type: "string",
          },
          retention_period: {
            type: "integer",
          },
          size: {
            type: "integer",
          },
          items_count: {
            type: "integer",
          },
          tags: {
            type: "object",
            additionalProperties: true,
          },
          etag: {
            type: "string",
          },
        },
        required: ["name", "filters"],
      },
    },
  },
};

export default GetSnapshot;
