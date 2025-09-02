import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CommunityGalleries_Get: AppBlock = {
  name: "Community Galleries / Get",
  description: "Get a community gallery by gallery public name.",
  category: "Community Galleries",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/locations/${input.event.inputConfig.location}/communityGalleries/${input.event.inputConfig.publicGalleryName}` +
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
              disclaimer: {
                type: "string",
              },
              artifactTags: {
                type: "object",
                additionalProperties: true,
              },
              communityMetadata: {
                type: "object",
                properties: {
                  publisherUri: {
                    type: "string",
                  },
                  publisherContact: {
                    type: "string",
                  },
                  eula: {
                    type: "string",
                  },
                  publicNames: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  privacyStatementUri: {
                    type: "string",
                  },
                },
                required: ["publisherContact", "publicNames"],
              },
            },
          },
        },
      },
    },
  },
};

export default CommunityGalleries_Get;
