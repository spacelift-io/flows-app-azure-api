import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_CreateOrUpdateDomainOwnershipIdentifier: AppBlock = {
  name: "Web Apps / Create Or Update Domain Ownership Identifier",
  description:
    "Description for Creates a domain ownership identifier for web app, or updates an existing ownership identifier.",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        domainOwnershipIdentifierName: {
          name: "Domain Ownership Identifier Name",
          description: "Name of the domain ownership identifier",
          type: "string",
          required: true,
        },
        domainOwnershipIdentifier: {
          name: "Domain Ownership Identifier",
          description:
            "A JSON representation of the domain ownership properties.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  id: {
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
        const requestBody = input.event.inputConfig.domainOwnershipIdentifier;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/domainOwnershipIdentifiers/${input.event.inputConfig.domainOwnershipIdentifierName}` +
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
            properties: {
              id: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_CreateOrUpdateDomainOwnershipIdentifier;
