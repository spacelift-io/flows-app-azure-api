import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedInstanceAzureADOnlyAuthentications_CreateOrUpdate: AppBlock = {
  name: "Managed Instance Azure AD Only Authentications / Create Or Update",
  description:
    "Sets Server Active Directory only authentication property or updates an existing server Active Directory only authentication property.",
  category: "Managed Instance Azure AD Only Authentications",
  inputs: {
    default: {
      config: {
        managedInstanceName: {
          name: "Managed Instance Name",
          description: "Name of the managed instance",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/azureADOnlyAuthentications/${input.event.inputConfig.authenticationName}` +
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

export default ManagedInstanceAzureADOnlyAuthentications_CreateOrUpdate;
