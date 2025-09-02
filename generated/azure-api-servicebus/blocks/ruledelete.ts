import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Rule_Delete: AppBlock = {
  name: "Rule / Delete",
  description:
    "Delete the rule with the given topicName, subscriptionName and ruleName.",
  category: "Rule",
  inputs: {
    default: {
      config: {
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
      },
      onEvent: async (input) => {
        const url = `${input.event.inputConfig.endpoint || input.app.config.endpoint}/${input.event.inputConfig.topicName}/subscriptions/${input.event.inputConfig.subscriptionName}/rules/${input.event.inputConfig.ruleName}`;

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
      },
    },
  },
};

export default Rule_Delete;
