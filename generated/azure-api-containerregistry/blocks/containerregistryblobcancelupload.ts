import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistryBlob_CancelUpload: AppBlock = {
  name: "Container Registry Blob / Cancel Upload",
  description:
    "Cancel outstanding upload processes, releasing associated resources. If this is not called, the unfinished uploads will eventually timeout.",
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
          "DELETE",
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

export default ContainerRegistryBlob_CancelUpload;
