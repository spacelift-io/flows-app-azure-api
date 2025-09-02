import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Operations_RegionalCheckNameAvailability: AppBlock = {
  name: "Operations / Regional Check Name Availability",
  description:
    "Checks whether the configuration store name is available for use.",
  category: "Operations",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        checkNameAvailabilityParameters: {
          name: "Check Name Availability Parameters",
          description:
            "The object containing information for the availability request.",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              type: {
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
        const requestBody =
          input.event.inputConfig.checkNameAvailabilityParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.AppConfiguration/locations/${input.event.inputConfig.location}/checkNameAvailability` +
          "?api-version=2024-06-01";

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
          message: {
            type: "string",
          },
          reason: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Operations_RegionalCheckNameAvailability;
