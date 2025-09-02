import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistryBlob_MountBlob: AppBlock = {
  name: "Container Registry Blob / Mount Blob",
  description:
    "Mount a blob identified by the `mount` parameter from another repository.",
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
        from: {
          name: "From",
          description: "Name of the source repository.",
          type: "string",
          required: true,
        },
        mount: {
          name: "Mount",
          description: "Digest of blob to mount from the source repository.",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/v2/${input.event.inputConfig.name}/blobs/uploads/` +
          (input.event.inputConfig.from
            ? `?from=${input.event.inputConfig.from}`
            : "") +
          (input.event.inputConfig.mount
            ? `&mount=${input.event.inputConfig.mount}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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

export default ContainerRegistryBlob_MountBlob;
