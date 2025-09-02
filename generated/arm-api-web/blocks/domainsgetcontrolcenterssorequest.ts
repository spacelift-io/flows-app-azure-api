import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Domains_GetControlCenterSsoRequest: AppBlock = {
  name: "Domains / Get Control Center Sso Request",
  description:
    "Description for Generate a single sign-on request for the domain management portal.",
  category: "Domains",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.DomainRegistration/generateSsoRequest` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          url: {
            type: "string",
          },
          postParameterKey: {
            type: "string",
          },
          postParameterValue: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Domains_GetControlCenterSsoRequest;
