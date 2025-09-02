import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Domains_CheckAvailability: AppBlock = {
  name: "Domains / Check Availability",
  description:
    "Description for Check if a domain is available for registration.",
  category: "Domains",
  inputs: {
    default: {
      config: {
        identifier: {
          name: "Identifier",
          description: "Name of the domain.",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
            },
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
        const requestBody = input.event.inputConfig.identifier;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.DomainRegistration/checkDomainAvailability` +
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
          name: {
            type: "string",
          },
          available: {
            type: "boolean",
          },
          domainType: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Domains_CheckAvailability;
