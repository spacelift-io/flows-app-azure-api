import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistryBlob_DeleteBlob: AppBlock = {
  name: "Container Registry Blob / Delete Blob",
  description: "Removes an already uploaded blob.",
  category: "Container Registry Blob",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        digest: {
          name: "Digest",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/v2/${input.event.inputConfig.name}/blobs/${input.event.inputConfig.digest}`;

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

export default ContainerRegistryBlob_DeleteBlob;
