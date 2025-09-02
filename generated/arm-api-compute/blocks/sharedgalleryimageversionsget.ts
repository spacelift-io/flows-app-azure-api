import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SharedGalleryImageVersions_Get: AppBlock = {
  name: "Shared Gallery Image Versions / Get",
  description:
    "Get a shared gallery image version by subscription id or tenant id.",
  category: "Shared Gallery Image Versions",
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
        galleryImageVersionName: {
          name: "Gallery Image Version Name",
          description: "Name of the gallery image version",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/locations/${input.event.inputConfig.location}/sharedGalleries/${input.event.inputConfig.galleryUniqueName}/images/${input.event.inputConfig.galleryImageName}/versions/${input.event.inputConfig.galleryImageVersionName}` +
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
              publishedDate: {
                type: "string",
              },
              endOfLifeDate: {
                type: "string",
              },
              excludeFromLatest: {
                type: "boolean",
              },
              storageProfile: {
                type: "object",
                properties: {
                  osDiskImage: {
                    type: "object",
                  },
                  dataDiskImages: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        lun: {
                          type: "integer",
                        },
                      },
                      required: ["lun"],
                    },
                  },
                },
              },
              artifactTags: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
        },
      },
    },
  },
};

export default SharedGalleryImageVersions_Get;
