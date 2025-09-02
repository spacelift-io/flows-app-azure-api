import { defineApp } from "@slflows/sdk/v1";
import { blocks } from "./blocks";

export const app = defineApp({
  name: "ARM API Compute",
  config: {
    accessToken: {
      name: "Azure Access Token",
      description: "Access token from Azure OIDC app",
      type: "string",
      required: true,
      sensitive: true,
    },
    subscriptionId: {
      name: "Default Subscription ID",
      description:
        "Default Azure subscription ID (optional, can be specified per block instead)",
      type: "string",
      required: false,
    },
    resourceGroupName: {
      name: "Default Resource Group",
      description:
        "Default Azure resource group name (optional, can be specified per block instead)",
      type: "string",
      required: false,
    },
  },
  blocks,
  installationInstructions: `Get the token from the Azure OIDC app for the \`management\` service using a signal reference like \`ref("signal.azureOidc.accessTokens").management\`.`,
});
