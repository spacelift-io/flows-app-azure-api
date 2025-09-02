import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CheckSnapshot: AppBlock = {
  name: "Check Snapshot",
  description: "Requests the headers and status of the given resource.",
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

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/snapshots/${input.event.inputConfig.name}`;

        const result = await makeAzureRequest(
          input,
          url,
          "HEAD",
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
        additionalProperties: true,
      },
    },
  },
};

export default CheckSnapshot;
