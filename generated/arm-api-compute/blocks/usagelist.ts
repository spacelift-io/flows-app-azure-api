import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Usage_List: AppBlock = {
  name: "Usage / List",
  description:
    "Gets, for the specified location, the current compute resource usage information as well as the limits for compute resources under the subscription.",
  category: "Usage",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/locations/${input.event.inputConfig.location}/usages` +
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
              required: ["unit", "currentValue", "limit", "name"],
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

export default Usage_List;
