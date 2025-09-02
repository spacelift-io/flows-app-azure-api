import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistry_GetProperties: AppBlock = {
  name: "Container Registry / Get Properties",
  description: "Get repository attributes",
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
          registry: {
            type: "string",
          },
          imageName: {
            type: "string",
          },
          createdTime: {
            type: "string",
          },
          lastUpdateTime: {
            type: "string",
          },
          manifestCount: {
            type: "integer",
          },
          tagCount: {
            type: "integer",
          },
          changeableAttributes: {
            type: "object",
            properties: {
              deleteEnabled: {
                type: "boolean",
              },
              writeEnabled: {
                type: "boolean",
              },
              listEnabled: {
                type: "boolean",
              },
              readEnabled: {
                type: "boolean",
              },
            },
          },
        },
        required: [
          "registry",
          "imageName",
          "createdTime",
          "lastUpdateTime",
          "manifestCount",
          "tagCount",
          "changeableAttributes",
        ],
      },
    },
  },
};

export default ContainerRegistry_GetProperties;
