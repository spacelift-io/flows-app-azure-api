import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SubscriptionUsages_Get: AppBlock = {
  name: "Subscription Usages / Get",
  description: "Gets a subscription usage metric.",
  category: "Subscription Usages",
  inputs: {
    default: {
      config: {
        locationName: {
          name: "Location Name",
          description: "Name of the location",
          type: "string",
          required: true,
        },
        usageName: {
          name: "Usage Name",
          description: "Name of the usage",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Sql/locations/${input.event.inputConfig.locationName}/usages/${input.event.inputConfig.usageName}` +
          "?api-version=2023-08-01";

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
              displayName: {
                type: "string",
              },
              currentValue: {
                type: "number",
              },
              limit: {
                type: "number",
              },
              unit: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default SubscriptionUsages_Get;
