import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistry_UpdateProperties: AppBlock = {
  name: "Container Registry / Update Properties",
  description:
    "Update the attribute identified by `name` where `reference` is the name of the repository.",
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
        value: {
          name: "Value",
          description: "Repository attribute value",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.value;

        const url = `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/acr/v1/${input.event.inputConfig.name}`;

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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

export default ContainerRegistry_UpdateProperties;
