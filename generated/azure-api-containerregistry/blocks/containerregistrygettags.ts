import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistry_GetTags: AppBlock = {
  name: "Container Registry / Get Tags",
  description: "List tags of a repository",
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
        orderby: {
          name: "Orderby",
          type: "string",
          required: false,
        },
        digest: {
          name: "Digest",
          description: "filter by digest",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/acr/v1/${input.event.inputConfig.name}/_tags` +
          (input.event.inputConfig.last
            ? `?last=${input.event.inputConfig.last}`
            : "") +
          (input.event.inputConfig.n ? `&n=${input.event.inputConfig.n}` : "") +
          (input.event.inputConfig.orderby
            ? `&orderby=${input.event.inputConfig.orderby}`
            : "") +
          (input.event.inputConfig.digest
            ? `&digest=${input.event.inputConfig.digest}`
            : "");

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
          tags: {
            type: "array",
            items: {
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
          link: {
            type: "string",
          },
        },
        required: ["registry", "imageName", "tags"],
      },
    },
  },
};

export default ContainerRegistry_GetTags;
