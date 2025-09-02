import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StaticSites_CreateOrUpdateStaticSiteCustomDomain: AppBlock = {
  name: "Static Sites / Create Or Update Static Site Custom Domain",
  description:
    "Description for Creates a new static site custom domain in an existing resource group and static site.",
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
        domainName: {
          name: "Domain Name",
          description: "Name of the domain",
          type: "string",
          required: true,
        },
        staticSiteCustomDomainRequestPropertiesEnvelope: {
          name: "Static Site Custom Domain Request Properties Envelope",
          description:
            "A JSON representation of the static site custom domain request properties. See example.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  validationMethod: {
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
        const requestBody =
          input.event.inputConfig
            .staticSiteCustomDomainRequestPropertiesEnvelope;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/staticSites/${input.event.inputConfig.name}/customDomains/${input.event.inputConfig.domainName}` +
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
              domainName: {
                type: "string",
              },
              createdOn: {
                type: "string",
              },
              status: {
                type: "string",
              },
              validationToken: {
                type: "string",
              },
              errorMessage: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default StaticSites_CreateOrUpdateStaticSiteCustomDomain;
