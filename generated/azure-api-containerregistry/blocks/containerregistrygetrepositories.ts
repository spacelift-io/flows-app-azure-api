import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistry_GetRepositories: AppBlock = {
  name: "Container Registry / Get Repositories",
  description: "List repositories",
  category: "Container Registry",
  inputs: {
    default: {
      config: {
        last: {
          name: "Last",
          type: "string",
          required: false,
        },
        n: {
          name: "N",
          type: "number",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/acr/v1/_catalog` +
          (input.event.inputConfig.last
            ? `?last=${input.event.inputConfig.last}`
            : "") +
          (input.event.inputConfig.n ? `&n=${input.event.inputConfig.n}` : "");

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
        properties: {
          repositories: {
            type: "array",
            items: {
              type: "string",
            },
          },
          link: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ContainerRegistry_GetRepositories;
