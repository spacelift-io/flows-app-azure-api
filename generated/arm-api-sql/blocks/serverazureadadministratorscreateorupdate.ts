import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ServerAzureADAdministrators_CreateOrUpdate: AppBlock = {
  name: "Server Azure AD Administrators / Create Or Update",
  description:
    "Creates or updates an existing Azure Active Directory administrator.",
  category: "Server Azure AD Administrators",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        administratorName: {
          name: "Administrator Name",
          description: "Name of the administrator",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description:
            "The requested Azure Active Directory administrator Resource state.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  administratorType: {
                    type: "string",
                  },
                  login: {
                    type: "string",
                  },
                  sid: {
                    type: "string",
                  },
                  tenantId: {
                    type: "string",
                  },
                  azureADOnlyAuthentication: {
                    type: "boolean",
                  },
                },
                required: ["login", "sid"],
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/administrators/${input.event.inputConfig.administratorName}` +
          "?api-version=2023-08-01";

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
              administratorType: {
                type: "string",
              },
              login: {
                type: "string",
              },
              sid: {
                type: "string",
              },
              tenantId: {
                type: "string",
              },
              azureADOnlyAuthentication: {
                type: "boolean",
              },
            },
            required: ["login", "sid"],
          },
        },
      },
    },
  },
};

export default ServerAzureADAdministrators_CreateOrUpdate;
