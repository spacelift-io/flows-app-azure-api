import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistryBlob_GetUploadStatus: AppBlock = {
  name: "Container Registry Blob / Get Upload Status",
  description:
    "Retrieve status of upload identified by uuid. The primary purpose of this endpoint is to resolve the current status of a resumable upload.",
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
      },
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/${input.event.inputConfig.nextBlobUuidLink}`;

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
        additionalProperties: true,
      },
    },
  },
};

export default ContainerRegistryBlob_GetUploadStatus;
