import { defineApp } from "@slflows/sdk/v1";
import { blocks } from "./blocks";

export const app = defineApp({
  name: "Azure API Servicebus",
  config: {
    accessToken: {
      name: "Azure Access Token",
      description: "Access token from Azure OIDC app",
      type: "string",
      required: true,
      sensitive: true,
    },
    endpoint: {
      name: "Default Service Bus Endpoint",
      description:
        "Default Service Bus endpoint (e.g., https://myservicebus.servicebus.windows.net) (optional, can be specified per block instead)",
      type: "string",
      required: false,
    },
  },
  blocks,
  installationInstructions: `Get the token from the Azure OIDC app for the \`servicebus\` service using a signal reference like \`ref("signal.azureOidc.accessTokens").servicebus\`.`,
});
