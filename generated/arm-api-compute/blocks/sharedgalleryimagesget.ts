import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SharedGalleryImages_Get: AppBlock = {
  name: "Shared Gallery Images / Get",
  description: "Get a shared gallery image by subscription id or tenant id.",
  category: "Shared Gallery Images",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        galleryUniqueName: {
          name: "Gallery Unique Name",
          description: "Name of the gallery unique",
          type: "string",
          required: true,
        },
        galleryImageName: {
          name: "Gallery Image Name",
          description: "Name of the gallery image",
          type: "string",
          required: true,
        },
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/locations/${input.event.inputConfig.location}/sharedGalleries/${input.event.inputConfig.galleryUniqueName}/images/${input.event.inputConfig.galleryImageName}` +
          "?api-version=2024-03-03";

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
          properties: {
            type: "object",
            properties: {
              osType: {
                type: "string",
              },
              osState: {
                type: "string",
              },
              endOfLifeDate: {
                type: "string",
              },
              identifier: {
                type: "object",
                properties: {
                  publisher: {
                    type: "string",
                  },
                  offer: {
                    type: "string",
                  },
                  sku: {
                    type: "string",
                  },
                },
                required: ["publisher", "offer", "sku"],
              },
              recommended: {
                type: "object",
                properties: {
                  vCPUs: {
                    type: "object",
                    properties: {
                      min: {
                        type: "integer",
                      },
                      max: {
                        type: "integer",
                      },
                    },
                  },
                  memory: {
                    type: "object",
                    properties: {
                      min: {
                        type: "object",
                        additionalProperties: true,
                      },
                      max: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                  },
                },
              },
              disallowed: {
                type: "object",
                properties: {
                  diskTypes: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
              hyperVGeneration: {
                type: "string",
              },
              features: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    value: {
                      type: "string",
                    },
                    startsAtVersion: {
                      type: "string",
                    },
                  },
                },
              },
              purchasePlan: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  publisher: {
                    type: "string",
                  },
                  product: {
                    type: "string",
                  },
                },
              },
              architecture: {
                type: "string",
              },
              privacyStatementUri: {
                type: "string",
              },
              eula: {
                type: "string",
              },
              artifactTags: {
                type: "object",
                additionalProperties: true,
              },
            },
            required: ["osType", "osState", "identifier"],
          },
        },
      },
    },
  },
};

export default SharedGalleryImages_Get;
