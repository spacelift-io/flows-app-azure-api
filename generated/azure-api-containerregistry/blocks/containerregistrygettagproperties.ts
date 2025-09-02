import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistry_GetTagProperties: AppBlock = {
  name: "Container Registry / Get Tag Properties",
  description: "Get tag attributes by tag",
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
      },
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/acr/v1/${input.event.inputConfig.name}/_tags/${input.event.inputConfig.reference}`;

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
          tag: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              digest: {
                type: "string",
              },
              createdTime: {
                type: "string",
              },
              lastUpdateTime: {
                type: "string",
              },
              signed: {
                type: "boolean",
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
              "name",
              "digest",
              "createdTime",
              "lastUpdateTime",
              "changeableAttributes",
            ],
          },
        },
        required: ["registry", "imageName", "tag"],
      },
    },
  },
};

export default ContainerRegistry_GetTagProperties;
