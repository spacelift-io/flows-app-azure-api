import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistry_CheckDockerV2Support: AppBlock = {
  name: "Container Registry / Check Docker V2Support",
  description:
    "Tells whether this Docker Registry instance supports Docker Registry HTTP API v2",
  category: "Container Registry",
  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/v2/`;

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

export default ContainerRegistry_CheckDockerV2Support;
