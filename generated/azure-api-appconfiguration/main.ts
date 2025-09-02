import { defineApp } from "@slflows/sdk/v1";
import { blocks } from "./blocks";

export const app = defineApp({
  name: "Azure API App Configuration",
  config: {
    accessToken: {
      name: "Azure Access Token",
      description: "Access token from Azure OIDC app",
      type: "string",
      required: true,
      sensitive: true,
    },
    endpoint: {
      name: "Default App Configuration Endpoint",
      description:
        "Default App Configuration endpoint (e.g., https://myappconfig.azconfig.io) (optional, can be specified per block instead)",
      type: "string",
      required: false,
    },
  },
  blocks,
  installationInstructions: `Get the token from the Azure OIDC app for the \`appconfiguration\` service using a signal reference like \`ref("signal.azureOidc.accessTokens").appconfiguration\`.`,
});
