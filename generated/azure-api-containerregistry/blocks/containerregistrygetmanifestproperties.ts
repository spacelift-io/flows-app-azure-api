import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistry_GetManifestProperties: AppBlock = {
  name: "Container Registry / Get Manifest Properties",
  description: "Get manifest attributes",
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
        digest: {
          name: "Digest",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/acr/v1/${input.event.inputConfig.name}/_manifests/${input.event.inputConfig.digest}`;

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
          manifest: {
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
        required: ["manifest"],
      },
    },
  },
};

export default ContainerRegistry_GetManifestProperties;
