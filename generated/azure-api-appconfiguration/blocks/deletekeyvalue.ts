import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DeleteKeyValue: AppBlock = {
  name: "Delete Key Value",
  description: "Deletes a key-value.",
  category: "General",
  inputs: {
    default: {
      config: {
        key: {
          name: "Key",
          type: "string",
          required: true,
        },
        label: {
          name: "Label",
          description: "The label of the key-value to delete.",
          type: "string",
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
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }

        const url =
          `${input.event.inputConfig.endpoint || input.app.config.endpoint}/kv/${input.event.inputConfig.key}` +
          (input.event.inputConfig.label
            ? `?label=${input.event.inputConfig.label}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "DELETE",
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
          key: {
            type: "string",
          },
          label: {
            type: "string",
          },
          content_type: {
            type: "string",
          },
          value: {
            type: "string",
          },
          last_modified: {
            type: "string",
          },
          tags: {
            type: "object",
            additionalProperties: true,
          },
          locked: {
            type: "boolean",
          },
          etag: {
            type: "string",
          },
        },
        required: ["key"],
      },
    },
  },
};

export default DeleteKeyValue;
