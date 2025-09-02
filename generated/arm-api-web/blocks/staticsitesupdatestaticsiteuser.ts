import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StaticSites_UpdateStaticSiteUser: AppBlock = {
  name: "Static Sites / Update Static Site User",
  description: "Description for Updates a user entry with the listed roles",
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
        authprovider: {
          name: "Authprovider",
          description: "Unique identifier",
          type: "string",
          required: true,
        },
        userid: {
          name: "Userid",
          description: "Unique identifier",
          type: "string",
          required: true,
        },
        staticSiteUserEnvelope: {
          name: "Static Site User Envelope",
          description:
            "A JSON representation of the StaticSiteUser properties. See example.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  provider: {
                    type: "string",
                  },
                  userId: {
                    type: "string",
                  },
                  displayName: {
                    type: "string",
                  },
                  roles: {
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
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.staticSiteUserEnvelope;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/staticSites/${input.event.inputConfig.name}/authproviders/${input.event.inputConfig.authprovider}/users/${input.event.inputConfig.userid}` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
              provider: {
                type: "string",
              },
              userId: {
                type: "string",
              },
              displayName: {
                type: "string",
              },
              roles: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default StaticSites_UpdateStaticSiteUser;
