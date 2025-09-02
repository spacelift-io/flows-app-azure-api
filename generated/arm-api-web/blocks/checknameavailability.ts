import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CheckNameAvailability: AppBlock = {
  name: "Check Name Availability",
  description: "Description for Check if a resource name is available.",
  category: "General",
  inputs: {
    default: {
      config: {
        request: {
          name: "Request",
          description: "Name availability request.",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              type: {
                type: "string",
              },
              isFqdn: {
                type: "boolean",
              },
              environmentId: {
                type: "string",
              },
            },
            required: ["name", "type"],
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
        const requestBody = input.event.inputConfig.request;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Web/checknameavailability` +
          "?api-version=2024-11-01";

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
          nameAvailable: {
            type: "boolean",
          },
          reason: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
      },
    },
  },
};

export default CheckNameAvailability;
