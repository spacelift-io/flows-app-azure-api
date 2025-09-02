import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SpotPlacementScores_Post: AppBlock = {
  name: "Spot Placement Scores / Post",
  description: "Generates placement scores for Spot VM skus.",
  category: "Spot Placement Scores",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        spotPlacementScoresInput: {
          name: "Spot Placement Scores Input",
          description:
            "SpotPlacementScores object supplied in the body of the Post spot placement scores operation.",
          type: {
            type: "object",
            properties: {
              desiredLocations: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              desiredSizes: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    sku: {
                      type: "string",
                    },
                  },
                },
              },
              desiredCount: {
                type: "number",
              },
              availabilityZones: {
                type: "boolean",
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
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.spotPlacementScoresInput;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/locations/${input.event.inputConfig.location}/placementScores/spot/generate` +
          "?api-version=2025-06-05";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          desiredLocations: {
            type: "array",
            items: {
              type: "string",
            },
          },
          desiredSizes: {
            type: "array",
            items: {
              type: "object",
              properties: {
                sku: {
                  type: "string",
                },
              },
            },
          },
          desiredCount: {
            type: "integer",
          },
          availabilityZones: {
            type: "boolean",
          },
          placementScores: {
            type: "array",
            items: {
              type: "object",
              properties: {
                sku: {
                  type: "string",
                },
                region: {
                  type: "string",
                },
                availabilityZone: {
                  type: "string",
                },
                score: {
                  type: "string",
                },
                isQuotaAvailable: {
                  type: "boolean",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default SpotPlacementScores_Post;
