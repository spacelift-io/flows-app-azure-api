import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ListBillingMeters: AppBlock = {
  name: "List Billing Meters",
  description: "Description for Gets a list of meters for a given location.",
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
        billingLocation: {
          name: "Billing Location",
          description: "Azure Location of billable resource",
          type: "string",
          required: false,
        },
        osType: {
          name: "OS Type",
          description: "App Service OS type meters used for",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Web/billingMeters` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.billingLocation
            ? `&billingLocation=${input.event.inputConfig.billingLocation}`
            : "") +
          (input.event.inputConfig.osType
            ? `&osType=${input.event.inputConfig.osType}`
            : "");

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
                    meterId: {
                      type: "string",
                    },
                    billingLocation: {
                      type: "string",
                    },
                    shortName: {
                      type: "string",
                    },
                    friendlyName: {
                      type: "string",
                    },
                    resourceType: {
                      type: "string",
                    },
                    osType: {
                      type: "string",
                    },
                    multiplier: {
                      type: "number",
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

export default ListBillingMeters;
