import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GalleryImages_Update: AppBlock = {
  name: "Gallery Images / Update",
  description: "Update a gallery image definition.",
  category: "Gallery Images",
  inputs: {
    default: {
      config: {
        galleryName: {
          name: "Gallery Name",
          description: "Name of the gallery",
          type: "string",
          required: true,
        },
        galleryImageName: {
          name: "Gallery Image Name",
          description: "Name of the gallery image",
          type: "string",
          required: true,
        },
        galleryImage: {
          name: "Gallery Image",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  eula: {
                    type: "string",
                  },
                  privacyStatementUri: {
                    type: "string",
                  },
                  releaseNoteUri: {
                    type: "string",
                  },
                  osType: {
                    type: "string",
                  },
                  osState: {
                    type: "string",
                  },
                  hyperVGeneration: {
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
                            type: "number",
                          },
                          max: {
                            type: "number",
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
                  provisioningState: {
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
                  architecture: {
                    type: "string",
                  },
                  allowUpdateImage: {
                    type: "boolean",
                  },
                },
                required: ["osType", "osState", "identifier"],
              },
            },
          },
          required: true,
        },
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
        resourceGroupName: {
          name: "Resource Group Name",
          description:
            "Azure resource group name (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.galleryImage;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/galleries/${input.event.inputConfig.galleryName}/images/${input.event.inputConfig.galleryImageName}` +
          "?api-version=2024-03-03";

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
          properties: {
            type: "object",
            properties: {
              description: {
                type: "string",
              },
              eula: {
                type: "string",
              },
              privacyStatementUri: {
                type: "string",
              },
              releaseNoteUri: {
                type: "string",
              },
              osType: {
                type: "string",
              },
              osState: {
                type: "string",
              },
              hyperVGeneration: {
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
              provisioningState: {
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
              architecture: {
                type: "string",
              },
              allowUpdateImage: {
                type: "boolean",
              },
            },
            required: ["osType", "osState", "identifier"],
          },
        },
      },
    },
  },
};

export default GalleryImages_Update;
