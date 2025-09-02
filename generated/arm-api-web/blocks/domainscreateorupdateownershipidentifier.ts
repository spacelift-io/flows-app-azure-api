import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Domains_CreateOrUpdateOwnershipIdentifier: AppBlock = {
  name: "Domains / Create Or Update Ownership Identifier",
  description:
    "Description for Creates an ownership identifier for a domain or updates identifier details for an existing identifier",
  category: "Domains",
  inputs: {
    default: {
      config: {
        domainName: {
          name: "Domain Name",
          description: "Name of the domain",
          type: "string",
          required: true,
        },
        name: {
          name: "Name",
          description: "Name of the ",
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
                  ownershipId: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.DomainRegistration/domains/${input.event.inputConfig.domainName}/domainOwnershipIdentifiers/${input.event.inputConfig.name}` +
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
              ownershipId: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default Domains_CreateOrUpdateOwnershipIdentifier;
