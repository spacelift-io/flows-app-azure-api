import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistryBlob_UploadChunk: AppBlock = {
  name: "Container Registry Blob / Upload Chunk",
  description: "Upload a stream of data without completing the upload.",
  category: "Container Registry Blob",
  inputs: {
    default: {
      config: {
        nextBlobUuidLink: {
          name: "Next Blob Uuid Link",
          description: "Unique identifier",
          type: "string",
          required: true,
        },
        value: {
          name: "Value",
          description: "Request body content",
          type: "string",
          required: true,
        },
        isBinaryData: {
          name: "Is Binary Data",
          description:
            "Whether the body contains binary data (base64-encoded) or text content",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.value;

        const url = `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/${input.event.inputConfig.nextBlobUuidLink}`;

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
        additionalProperties: true,
      },
    },
  },
};

export default ContainerRegistryBlob_UploadChunk;
