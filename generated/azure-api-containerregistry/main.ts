import { defineApp } from "@slflows/sdk/v1";
import { blocks } from "./blocks";

export const app = defineApp({
  name: "Azure API Container Registry",
  config: {
    accessToken: {
      name: "Azure Access Token",
      description: "Access token from Azure OIDC app",
      type: "string",
      required: true,
      sensitive: true,
    },
    registryLoginUri: {
      name: "Default Container Registry Login URI",
      description:
        "Default container registry login URI (e.g., myregistry.azurecr.io) (optional, can be specified per block instead)",
      type: "string",
      required: false,
    },
  },
  blocks,
  installationInstructions: `Get the token from the Azure OIDC app for the \`containerregistry\` service using a signal reference like \`ref("signal.azureOidc.accessTokens").containerregistry\`.`,
});
