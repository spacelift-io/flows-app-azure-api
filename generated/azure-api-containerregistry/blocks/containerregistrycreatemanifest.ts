import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistry_CreateManifest: AppBlock = {
  name: "Container Registry / Create Manifest",
  description:
    "Put the manifest identified by `name` and `reference` where `reference` can be a tag or digest.",
  category: "Container Registry",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        reference: {
          name: "Reference",
          type: "string",
          required: true,
        },
        payload: {
          name: "Payload",
          description:
            "Manifest body, can take v1 or v2 values depending on accept header",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.payload;

        const url = `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/v2/${input.event.inputConfig.name}/manifests/${input.event.inputConfig.reference}`;

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

export default ContainerRegistry_CreateManifest;
