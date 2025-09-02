import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CheckDnsNameAvailability: AppBlock = {
  name: "Check Dns Name Availability",
  description:
    "Checks whether a domain name in the cloudapp.azure.com zone is available for use.",
  category: "General",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        domainNameLabel: {
          name: "Domain Name Label",
          description:
            "The domain name to be verified. It must conform to the following regular expression: ^[a-z][a-z0-9-]{1,61}[a-z0-9]$.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/locations/${input.event.inputConfig.location}/CheckDnsNameAvailability` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.domainNameLabel
            ? `&domainNameLabel=${input.event.inputConfig.domainNameLabel}`
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
          available: {
            type: "boolean",
          },
        },
      },
    },
  },
};

export default CheckDnsNameAvailability;
