import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const listRules: AppBlock = {
  name: "list Rules",
  description:
    "Get the details about the rules of the given topic subscription.",
  category: "General",
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
        $skip: {
          name: "Skip",
          type: "number",
          required: false,
        },
        $top: {
          name: "Top",
          type: "number",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `${input.event.inputConfig.endpoint || input.app.config.endpoint}/${input.event.inputConfig.topicName}/subscriptions/${input.event.inputConfig.subscriptionName}/rules` +
          (input.event.inputConfig.$skip
            ? `?$skip=${input.event.inputConfig.$skip}`
            : "") +
          (input.event.inputConfig.$top
            ? `&$top=${input.event.inputConfig.$top}`
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

export default listRules;
