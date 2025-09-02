import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ApplicationGateways_GetSslPredefinedPolicy: AppBlock = {
  name: "Application Gateways / Get Ssl Predefined Policy",
  description: "Gets Ssl predefined policy with the specified policy name.",
  category: "Application Gateways",
  inputs: {
    default: {
      config: {
        predefinedPolicyName: {
          name: "Predefined Policy Name",
          description: "Name of the predefined policy",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/applicationGatewayAvailableSslOptions/default/predefinedPolicies/${input.event.inputConfig.predefinedPolicyName}` +
          "?api-version=2024-10-01";

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
          name: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              cipherSuites: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              minProtocolVersion: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default ApplicationGateways_GetSslPredefinedPolicy;
