import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Upload: AppBlock = {
  name: "Upload",
  description:
    "Ingestion API used to directly ingest data using Data Collection Rules.",
  category: "General",
  inputs: {
    default: {
      config: {
        ruleId: {
          name: "Rule ID",
          description: "Unique identifier",
          type: "string",
          required: true,
        },
        stream: {
          name: "Stream",
          type: "string",
          required: true,
        },
        body: {
          name: "Body",
          description:
            "The array of objects matching the schema defined by the provided stream.",
          type: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: true,
            },
          },
          required: true,
        },
        Content_Encoding: {
          name: "Content Encoding",
          description:
            "The content encoding of the request body which is always 'gzip'.",
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
        const requestBody = input.event.inputConfig.body;
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.Content_Encoding) {
          additionalHeaders["Content-Encoding"] = String(
            input.event.inputConfig.Content_Encoding,
          );
        }
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }

        const url = `https://${input.event.inputConfig.endpoint || input.app.config.dataCollectionEndpoint}/dataCollectionRules/${input.event.inputConfig.ruleId}/streams/${input.event.inputConfig.stream}`;

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
        additionalProperties: true,
      },
    },
  },
};

export default Upload;
