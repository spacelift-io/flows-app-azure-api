import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CommunityGalleryImageVersions_List: AppBlock = {
  name: "Community Gallery Image Versions / List",
  description: "List community gallery image versions inside an image.",
  category: "Community Gallery Image Versions",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        publicGalleryName: {
          name: "Public Gallery Name",
          description: "Name of the public gallery",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/locations/${input.event.inputConfig.location}/communityGalleries/${input.event.inputConfig.publicGalleryName}/images/${input.event.inputConfig.galleryImageName}/versions` +
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
          value: {
            type: "array",
            items: {
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
                    disclaimer: {
                      type: "string",
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
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default CommunityGalleryImageVersions_List;
