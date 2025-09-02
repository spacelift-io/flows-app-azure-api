import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ServerAzureADOnlyAuthentications_CreateOrUpdate: AppBlock = {
  name: "Server Azure AD Only Authentications / Create Or Update",
  description:
    "Sets Server Active Directory only authentication property or updates an existing server Active Directory only authentication property.",
  category: "Server Azure AD Only Authentications",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        authenticationName: {
          name: "Authentication Name",
          description: "Name of the authentication",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  azureADOnlyAuthentication: {
                    type: "boolean",
                  },
                },
                required: ["azureADOnlyAuthentication"],
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/azureADOnlyAuthentications/${input.event.inputConfig.authenticationName}` +
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
              azureADOnlyAuthentication: {
                type: "boolean",
              },
            },
            required: ["azureADOnlyAuthentication"],
          },
        },
      },
    },
  },
};

export default ServerAzureADOnlyAuthentications_CreateOrUpdate;
