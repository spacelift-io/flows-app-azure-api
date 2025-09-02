import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetUsagesInLocation_list: AppBlock = {
  name: "Get Usages In Location / list",
  description:
    "List usages in cores for all skus used by a subscription in a given location, for a specific quota type.",
  category: "Get Usages In Location",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Web/locations/${input.event.inputConfig.location}/usages` +
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
                unit: {
                  type: "string",
                },
                nextResetTime: {
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
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default GetUsagesInLocation_list;
