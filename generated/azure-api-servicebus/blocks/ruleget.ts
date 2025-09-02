import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Rule_Get: AppBlock = {
  name: "Rule / Get",
  description: "Get the details about the rule of a subscription of a topic.",
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
        enrich: {
          name: "Enrich",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `${input.event.inputConfig.endpoint || input.app.config.endpoint}/${input.event.inputConfig.topicName}/subscriptions/${input.event.inputConfig.subscriptionName}/rules/${input.event.inputConfig.ruleName}` +
          (input.event.inputConfig.enrich
            ? `?enrich=${input.event.inputConfig.enrich}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "GET",
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

export default Rule_Get;
