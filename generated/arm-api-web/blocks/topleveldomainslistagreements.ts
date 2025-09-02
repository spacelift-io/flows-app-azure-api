import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const TopLevelDomains_ListAgreements: AppBlock = {
  name: "Top Level Domains / List Agreements",
  description:
    "Description for Gets all legal agreements that user needs to accept before purchasing a domain.",
  category: "Top Level Domains",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        agreementOption: {
          name: "Agreement Option",
          description: "Domain agreement options.",
          type: {
            type: "object",
            properties: {
              includePrivacy: {
                type: "boolean",
              },
              forTransfer: {
                type: "boolean",
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
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.agreementOption;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.DomainRegistration/topLevelDomains/${input.event.inputConfig.name}/listAgreements` +
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                agreementKey: {
                  type: "string",
                },
                title: {
                  type: "string",
                },
                content: {
                  type: "string",
                },
                url: {
                  type: "string",
                },
              },
              required: ["agreementKey", "title", "content"],
            },
          },
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default TopLevelDomains_ListAgreements;
