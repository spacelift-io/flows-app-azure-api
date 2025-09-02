import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGateways_GetResiliencyInformation: AppBlock = {
  name: "Virtual Network Gateways / Get Resiliency Information",
  description:
    "This operation retrieves the resiliency information for an Express Route Gateway, including the gateway's current resiliency score and recommendations to further improve the score",
  category: "Virtual Network Gateways",
  inputs: {
    default: {
      config: {
        virtualNetworkGatewayName: {
          name: "Virtual Network Gateway Name",
          description: "Name of the virtual network gateway",
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
        resourceGroupName: {
          name: "Resource Group Name",
          description:
            "Azure resource group name (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
        attemptRefresh: {
          name: "Attempt Refresh",
          description:
            "Attempt to recalculate the Resiliency Information for the gateway",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/${input.event.inputConfig.virtualNetworkGatewayName}/getResiliencyInformation` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.attemptRefresh
            ? `&attemptRefresh=${input.event.inputConfig.attemptRefresh}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          overallScore: {
            type: "string",
          },
          scoreChange: {
            type: "string",
          },
          minScoreFromRecommendations: {
            type: "string",
          },
          maxScoreFromRecommendations: {
            type: "string",
          },
          lastComputedTime: {
            type: "string",
          },
          nextEligibleComputeTime: {
            type: "string",
          },
          components: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                currentScore: {
                  type: "string",
                },
                maxScore: {
                  type: "string",
                },
                recommendations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      recommendationTitle: {
                        type: "string",
                      },
                      recommendationId: {
                        type: "string",
                      },
                      severity: {
                        type: "string",
                      },
                      recommendationText: {
                        type: "string",
                      },
                      callToActionText: {
                        type: "string",
                      },
                      callToActionLink: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default VirtualNetworkGateways_GetResiliencyInformation;
