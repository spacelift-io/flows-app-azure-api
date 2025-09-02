import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistry_UpdateManifestProperties: AppBlock = {
  name: "Container Registry / Update Manifest Properties",
  description: "Update properties of a manifest",
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
        value: {
          name: "Value",
          description: "Manifest attribute value",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.value;

        const url = `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/acr/v1/${input.event.inputConfig.name}/_manifests/${input.event.inputConfig.digest}`;

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

export default ContainerRegistry_UpdateManifestProperties;
