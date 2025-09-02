import { defineApp } from "@slflows/sdk/v1";
import { blocks } from "./blocks";

export const app = defineApp({
  name: "Azure API Monitor",
  config: {
    accessToken: {
      name: "Azure Access Token",
      description: "Access token from Azure OIDC app",
      type: "string",
      required: true,
      sensitive: true,
    },
    dataCollectionEndpoint: {
      name: "Default Data Collection Endpoint",
      description:
        "Default data collection endpoint (e.g., https://dce-name.eastus-2.ingest.monitor.azure.com) (optional, can be specified per block instead)",
      type: "string",
      required: false,
    },
  },
  blocks,
  installationInstructions: `Get the token from the Azure OIDC app for the \`monitor\` service using a signal reference like \`ref("signal.azureOidc.accessTokens").monitor\`.`,
});
