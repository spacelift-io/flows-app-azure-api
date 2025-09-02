import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StaticSites_RegisterUserProvidedFunctionAppWithStaticSite: AppBlock = {
  name: "Static Sites / Register User Provided Function App With Static Site",
  description:
    "Description for Register a user provided function app with a static site",
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
        functionAppName: {
          name: "Function App Name",
          description: "Name of the function app",
          type: "string",
          required: true,
        },
        staticSiteUserProvidedFunctionEnvelope: {
          name: "Static Site User Provided Function Envelope",
          description:
            "A JSON representation of the user provided function app properties. See example.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  functionAppResourceId: {
                    type: "string",
                  },
                  functionAppRegion: {
                    type: "string",
                  },
                  createdOn: {
                    type: "string",
                  },
                },
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
        isForced: {
          name: "Is Forced",
          description:
            "Specify <code>true</code> to force the update of the auth configuration on the function app even if an AzureStaticWebApps provider is already configured on the function app. The default is <code>false</code>.",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody =
          input.event.inputConfig.staticSiteUserProvidedFunctionEnvelope;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/staticSites/${input.event.inputConfig.name}/userProvidedFunctionApps/${input.event.inputConfig.functionAppName}` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.isForced
            ? `&isForced=${input.event.inputConfig.isForced}`
            : "");

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
            properties: {
              functionAppResourceId: {
                type: "string",
              },
              functionAppRegion: {
                type: "string",
              },
              createdOn: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default StaticSites_RegisterUserProvidedFunctionAppWithStaticSite;
