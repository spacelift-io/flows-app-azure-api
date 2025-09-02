import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StaticSites_CreateOrUpdateStaticSiteBuildFunctionAppSettings: AppBlock = {
  name: "Static Sites / Create Or Update Static Site Build Function App Settings",
  description:
    "Description for Creates or updates the function app settings of a static site build.",
  category: "Static Sites",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        environmentName: {
          name: "Environment Name",
          description: "Name of the environment",
          type: "string",
          required: true,
        },
        appSettings: {
          name: "App Settings",
          description:
            "The dictionary containing the static site function app settings to update.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                additionalProperties: true,
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
        resourceGroupName: {
          name: "Resource Group Name",
          description:
            "Azure resource group name (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.appSettings;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/staticSites/${input.event.inputConfig.name}/builds/${input.event.inputConfig.environmentName}/config/functionappsettings` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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
          properties: {
            type: "object",
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export default StaticSites_CreateOrUpdateStaticSiteBuildFunctionAppSettings;
