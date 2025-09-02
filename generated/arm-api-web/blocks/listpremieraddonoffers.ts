import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ListPremierAddOnOffers: AppBlock = {
  name: "List Premier Add On Offers",
  description: "Description for List all premier add-on offers.",
  category: "General",
  inputs: {
    default: {
      config: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Web/premieraddonoffers` +
          "?api-version=2024-11-01";

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
                    sku: {
                      type: "string",
                    },
                    product: {
                      type: "string",
                    },
                    vendor: {
                      type: "string",
                    },
                    promoCodeRequired: {
                      type: "boolean",
                    },
                    quota: {
                      type: "integer",
                    },
                    webHostingPlanRestrictions: {
                      type: "string",
                    },
                    privacyPolicyUrl: {
                      type: "string",
                    },
                    legalTermsUrl: {
                      type: "string",
                    },
                    marketplacePublisher: {
                      type: "string",
                    },
                    marketplaceOffer: {
                      type: "string",
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

export default ListPremierAddOnOffers;
