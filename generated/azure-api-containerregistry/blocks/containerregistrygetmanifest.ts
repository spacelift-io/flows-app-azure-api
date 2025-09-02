import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ContainerRegistry_GetManifest: AppBlock = {
  name: "Container Registry / Get Manifest",
  description:
    "Get the manifest identified by `name` and `reference` where `reference` can be a tag or digest.",
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
        accept: {
          name: "Accept",
          description:
            "Accept header string delimited by comma. For example, application/vnd.docker.distribution.manifest.v2+json",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.accept) {
          additionalHeaders["accept"] = String(input.event.inputConfig.accept);
        }

        const url = `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/v2/${input.event.inputConfig.name}/manifests/${input.event.inputConfig.reference}`;

        const result = await makeAzureRequest(
          input,
          url,
          "GET",
          undefined,
          additionalHeaders,
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
          mediaType: {
            type: "string",
          },
          manifests: {
            type: "array",
            items: {
              type: "object",
              properties: {
                mediaType: {
                  type: "string",
                },
                size: {
                  type: "integer",
                },
                digest: {
                  type: "string",
                },
                platform: {
                  type: "object",
                  properties: {
                    architecture: {
                      type: "string",
                    },
                    os: {
                      type: "string",
                    },
                    "os.version": {
                      type: "string",
                    },
                    "os.features": {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    variant: {
                      type: "string",
                    },
                    features: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
          config: {
            type: "object",
            properties: {
              mediaType: {
                type: "string",
              },
              size: {
                type: "integer",
              },
              digest: {
                type: "string",
              },
              urls: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              annotations: {
                type: "object",
                properties: {
                  "org.opencontainers.image.created": {
                    type: "string",
                  },
                  "org.opencontainers.image.authors": {
                    type: "string",
                  },
                  "org.opencontainers.image.url": {
                    type: "string",
                  },
                  "org.opencontainers.image.documentation": {
                    type: "string",
                  },
                  "org.opencontainers.image.source": {
                    type: "string",
                  },
                  "org.opencontainers.image.version": {
                    type: "string",
                  },
                  "org.opencontainers.image.revision": {
                    type: "string",
                  },
                  "org.opencontainers.image.vendor": {
                    type: "string",
                  },
                  "org.opencontainers.image.licenses": {
                    type: "string",
                  },
                  "org.opencontainers.image.ref.name": {
                    type: "string",
                  },
                  "org.opencontainers.image.title": {
                    type: "string",
                  },
                  "org.opencontainers.image.description": {
                    type: "string",
                  },
                },
                additionalProperties: true,
              },
            },
          },
          layers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                mediaType: {
                  type: "string",
                },
                size: {
                  type: "integer",
                },
                digest: {
                  type: "string",
                },
                urls: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                annotations: {
                  type: "object",
                  properties: {
                    "org.opencontainers.image.created": {
                      type: "string",
                    },
                    "org.opencontainers.image.authors": {
                      type: "string",
                    },
                    "org.opencontainers.image.url": {
                      type: "string",
                    },
                    "org.opencontainers.image.documentation": {
                      type: "string",
                    },
                    "org.opencontainers.image.source": {
                      type: "string",
                    },
                    "org.opencontainers.image.version": {
                      type: "string",
                    },
                    "org.opencontainers.image.revision": {
                      type: "string",
                    },
                    "org.opencontainers.image.vendor": {
                      type: "string",
                    },
                    "org.opencontainers.image.licenses": {
                      type: "string",
                    },
                    "org.opencontainers.image.ref.name": {
                      type: "string",
                    },
                    "org.opencontainers.image.title": {
                      type: "string",
                    },
                    "org.opencontainers.image.description": {
                      type: "string",
                    },
                  },
                  additionalProperties: true,
                },
              },
            },
          },
          annotations: {
            type: "object",
            properties: {
              "org.opencontainers.image.created": {
                type: "string",
              },
              "org.opencontainers.image.authors": {
                type: "string",
              },
              "org.opencontainers.image.url": {
                type: "string",
              },
              "org.opencontainers.image.documentation": {
                type: "string",
              },
              "org.opencontainers.image.source": {
                type: "string",
              },
              "org.opencontainers.image.version": {
                type: "string",
              },
              "org.opencontainers.image.revision": {
                type: "string",
              },
              "org.opencontainers.image.vendor": {
                type: "string",
              },
              "org.opencontainers.image.licenses": {
                type: "string",
              },
              "org.opencontainers.image.ref.name": {
                type: "string",
              },
              "org.opencontainers.image.title": {
                type: "string",
              },
              "org.opencontainers.image.description": {
                type: "string",
              },
            },
            additionalProperties: true,
          },
          architecture: {
            type: "string",
          },
          name: {
            type: "string",
          },
          tag: {
            type: "string",
          },
          fsLayers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                blobSum: {
                  type: "string",
                },
              },
            },
          },
          history: {
            type: "array",
            items: {
              type: "object",
              properties: {
                v1Compatibility: {
                  type: "string",
                },
              },
            },
          },
          signatures: {
            type: "array",
            items: {
              type: "object",
              properties: {
                header: {
                  type: "object",
                  properties: {
                    jwk: {
                      type: "object",
                      properties: {
                        crv: {
                          type: "string",
                        },
                        kid: {
                          type: "string",
                        },
                        kty: {
                          type: "string",
                        },
                        x: {
                          type: "string",
                        },
                        y: {
                          type: "string",
                        },
                      },
                    },
                    alg: {
                      type: "string",
                    },
                  },
                },
                signature: {
                  type: "string",
                },
                protected: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default ContainerRegistry_GetManifest;
