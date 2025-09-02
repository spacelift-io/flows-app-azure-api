import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Rules_Delete: AppBlock = {
  name: "Rules / Delete",
  description: "Deletes an existing rule.",
  category: "Rules",
  inputs: {
    default: {
      config: {
        namespaceName: {
          name: "Namespace Name",
          description: "Name of the namespace",
          type: "string",
          required: true,
        },
        topicName: {
          name: "Topic Name",
          description: "Name of the topic",
          type: "string",
          required: true,
        },
        subscriptionName: {
          name: "Subscription Name",
          description: "Name of the subscription",
          type: "string",
          required: true,
        },
        ruleName: {
          name: "Rule Name",
          description: "Name of the rule",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${input.event.inputConfig.namespaceName}/topics/${input.event.inputConfig.topicName}/subscriptions/${input.event.inputConfig.subscriptionName}/rules/${input.event.inputConfig.ruleName}` +
          "?api-version=2024-01-01";

        const result = await makeAzureRequest(
          input,
          url,
          "DELETE",
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
        additionalProperties: true,
      },
    },
  },
};

export default Rules_Delete;
