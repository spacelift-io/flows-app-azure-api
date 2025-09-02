import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StaticSites_CreateUserRolesInvitationLink: AppBlock = {
  name: "Static Sites / Create User Roles Invitation Link",
  description:
    "Description for Creates an invitation link for a user with the role",
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
        staticSiteUserRolesInvitationEnvelope: {
          name: "Static Site User Roles Invitation Envelope",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  domain: {
                    type: "string",
                  },
                  provider: {
                    type: "string",
                  },
                  userDetails: {
                    type: "string",
                  },
                  roles: {
                    type: "string",
                  },
                  numHoursToExpiration: {
                    type: "number",
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
        const requestBody =
          input.event.inputConfig.staticSiteUserRolesInvitationEnvelope;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/staticSites/${input.event.inputConfig.name}/createUserInvitation` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
              expiresOn: {
                type: "string",
              },
              invitationUrl: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default StaticSites_CreateUserRolesInvitationLink;
