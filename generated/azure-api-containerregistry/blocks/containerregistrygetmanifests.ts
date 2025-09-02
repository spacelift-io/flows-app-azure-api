import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistry_GetManifests: AppBlock = {
  name: "Container Registry / Get Manifests",
  description: "List manifests of a repository",
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
      },
      onEvent: async (input) => {
        const url =
          `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/acr/v1/${input.event.inputConfig.name}/_manifests` +
          (input.event.inputConfig.last
            ? `?last=${input.event.inputConfig.last}`
            : "") +
          (input.event.inputConfig.n ? `&n=${input.event.inputConfig.n}` : "") +
          (input.event.inputConfig.orderby
            ? `&orderby=${input.event.inputConfig.orderby}`
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
          manifests: {
            type: "array",
            items: {
              type: "object",
              properties: {
                digest: {
                  type: "string",
                },
                imageSize: {
                  type: "integer",
                },
                createdTime: {
                  type: "string",
                },
                lastUpdateTime: {
                  type: "string",
                },
                architecture: {
                  type: "string",
                },
                os: {
                  type: "string",
                },
                references: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      digest: {
                        type: "string",
                      },
                      architecture: {
                        type: "string",
                      },
                      os: {
                        type: "string",
                      },
                    },
                    required: ["digest"],
                  },
                },
                configMediaType: {
                  type: "string",
                },
                tags: {
                  type: "array",
                  items: {
                    type: "string",
                  },
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
              required: ["digest", "createdTime", "lastUpdateTime"],
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

export default ContainerRegistry_GetManifests;
