import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistryBlob_CompleteUpload: AppBlock = {
  name: "Container Registry Blob / Complete Upload",
  description:
    "Complete the upload, providing all the data in the body, if necessary. A request without a body will just complete the upload with previously uploaded content.",
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
        digest: {
          name: "Digest",
          description: "Digest of a BLOB",
          type: "string",
          required: true,
        },
        value: {
          name: "Value",
          description: "Request body content",
          type: "string",
          required: false,
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

        const url =
          `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/${input.event.inputConfig.nextBlobUuidLink}` +
          (input.event.inputConfig.digest
            ? `?digest=${input.event.inputConfig.digest}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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

export default ContainerRegistryBlob_CompleteUpload;
