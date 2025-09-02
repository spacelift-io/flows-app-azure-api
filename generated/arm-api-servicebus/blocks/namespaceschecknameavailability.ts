import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Namespaces_CheckNameAvailability: AppBlock = {
  name: "Namespaces / Check Name Availability",
  description: "Check the give namespace name availability.",
  category: "Namespaces",
  inputs: {
    default: {
      config: {
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
            },
            required: ["name"],
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.ServiceBus/CheckNameAvailability` +
          "?api-version=2024-01-01";

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
          message: {
            type: "string",
          },
          nameAvailable: {
            type: "boolean",
          },
          reason: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Namespaces_CheckNameAvailability;
