import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SubscriptionUsages_Usages: AppBlock = {
  name: "Subscription Usages / Usages",
  description: "List Quota resources by subscription ID",
  category: "Subscription Usages",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.DevOpsInfrastructure/locations/${input.event.inputConfig.location}/usages` +
          "?api-version=2025-01-21";

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
                name: {
                  type: "object",
                  properties: {
                    value: {
                      type: "string",
                    },
                    localizedValue: {
                      type: "string",
                    },
                  },
                },
                id: {
                  type: "string",
                },
                unit: {
                  type: "string",
                },
                currentValue: {
                  type: "integer",
                },
                limit: {
                  type: "integer",
                },
              },
              required: ["id", "unit", "currentValue", "limit"],
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

export default SubscriptionUsages_Usages;
