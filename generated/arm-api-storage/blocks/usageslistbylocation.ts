import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Usages_ListByLocation: AppBlock = {
  name: "Usages / List By Location",
  description:
    "Gets the current usage count and the limit for the resources of the location under the subscription.",
  category: "Usages",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Storage/locations/${input.event.inputConfig.location}/usages` +
          "?api-version=2025-01-01";

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
                unit: {
                  type: "string",
                },
                currentValue: {
                  type: "integer",
                },
                limit: {
                  type: "integer",
                },
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
              },
            },
          },
        },
      },
    },
  },
};

export default Usages_ListByLocation;
