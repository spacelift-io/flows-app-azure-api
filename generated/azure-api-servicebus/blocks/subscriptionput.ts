import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Subscription_Put: AppBlock = {
  name: "Subscription / Put",
  description: "Create or update a subscription",
  category: "Subscription",
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
        requestBody: {
          name: "Request Body",
          type: {
            type: "object",
          },
          required: true,
        },
        If_Match: {
          name: "If Match",
          description:
            "Match condition for an entity to be updated. If specified and a matching entity is not found, an error will be raised. To force an unconditional update, set to the wildcard character (*). If not specified, an insert will be performed when no existing entity is found to update and a replace will be performed if an existing entity is found.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.requestBody;
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.If_Match) {
          additionalHeaders["If-Match"] = String(
            input.event.inputConfig.If_Match,
          );
        }

        const url = `${input.event.inputConfig.endpoint || input.app.config.endpoint}/${input.event.inputConfig.topicName}/subscriptions/${input.event.inputConfig.subscriptionName}`;

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
          requestBody,
          additionalHeaders,
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
      },
    },
  },
};

export default Subscription_Put;
