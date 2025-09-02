import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Queues_ListKeys: AppBlock = {
  name: "Queues / List Keys",
  description: "Primary and secondary connection strings to the queue.",
  category: "Queues",
  inputs: {
    default: {
      config: {
        namespaceName: {
          name: "Namespace Name",
          description: "Name of the namespace",
          type: "string",
          required: true,
        },
        queueName: {
          name: "Queue Name",
          description: "Name of the queue",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${input.event.inputConfig.namespaceName}/queues/${input.event.inputConfig.queueName}/authorizationRules/${input.event.inputConfig.authorizationRuleName}/ListKeys` +
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

export default Queues_ListKeys;
