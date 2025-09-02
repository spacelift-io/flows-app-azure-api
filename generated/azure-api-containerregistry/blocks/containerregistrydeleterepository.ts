import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistry_DeleteRepository: AppBlock = {
  name: "Container Registry / Delete Repository",
  description: "Delete the repository identified by `name`",
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
      },
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/acr/v1/${input.event.inputConfig.name}`;

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

export default ContainerRegistry_DeleteRepository;
