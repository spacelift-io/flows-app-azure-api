import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistryBlob_CheckBlobExists: AppBlock = {
  name: "Container Registry Blob / Check Blob Exists",
  description: "Same as GET, except only the headers are returned.",
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
          "HEAD",
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

export default ContainerRegistryBlob_CheckBlobExists;
