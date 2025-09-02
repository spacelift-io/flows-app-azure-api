import { defineApp } from "@slflows/sdk/v1";
import { blocks } from "./blocks";

export const app = defineApp({
  name: "Azure API Storage",
  config: {
    accessToken: {
      name: "Azure Access Token",
      description: "Access token from Azure OIDC app",
      type: "string",
      required: true,
      sensitive: true,
    },
    storageAccount: {
      name: "Default Storage Account Name",
      description:
        "Default storage account name (optional, can be specified per block instead)",
      type: "string",
      required: false,
    },
  },
  blocks,
  installationInstructions: `Get the token from the Azure OIDC app for the \`storage\` service using a signal reference like \`ref("signal.azureOidc.accessTokens").storage\`.`,
});
