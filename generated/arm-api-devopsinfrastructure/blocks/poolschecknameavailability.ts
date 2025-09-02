import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Pools_CheckNameAvailability: AppBlock = {
  name: "Pools / Check Name Availability",
  description: "Checks that the pool name is valid and is not already in use.",
  category: "Pools",
  inputs: {
    default: {
      config: {
        body: {
          name: "Body",
          description: "The CheckAvailability request",
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
        const requestBody = input.event.inputConfig.body;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.DevOpsInfrastructure/checkNameAvailability` +
          "?api-version=2025-01-21";

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
          available: {
            type: "string",
          },
          message: {
            type: "string",
          },
          name: {
            type: "string",
          },
          reason: {
            type: "string",
          },
        },
        required: ["available", "message", "name", "reason"],
      },
    },
  },
};

export default Pools_CheckNameAvailability;
