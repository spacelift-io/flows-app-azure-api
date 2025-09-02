import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Namespaces_ListKeys: AppBlock = {
  name: "Namespaces / List Keys",
  description:
    "Gets the primary and secondary connection strings for the namespace.",
  category: "Namespaces",
  inputs: {
    default: {
      config: {
        namespaceName: {
          name: "Namespace Name",
          description: "Name of the namespace",
          type: "string",
          required: true,
        },
        authorizationRuleName: {
          name: "Authorization Rule Name",
          description: "Name of the authorization rule",
          type: "string",
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
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${input.event.inputConfig.namespaceName}/AuthorizationRules/${input.event.inputConfig.authorizationRuleName}/listKeys` +
          "?api-version=2024-01-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
          undefined,
          undefined,
          false,
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
          primaryConnectionString: {
            type: "string",
          },
          secondaryConnectionString: {
            type: "string",
          },
          aliasPrimaryConnectionString: {
            type: "string",
          },
          aliasSecondaryConnectionString: {
            type: "string",
          },
          primaryKey: {
            type: "string",
          },
          secondaryKey: {
            type: "string",
          },
          keyName: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Namespaces_ListKeys;
