import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Webhooks_GetCallbackConfig: AppBlock = {
  name: "Webhooks / Get Callback Config",
  description:
    "Gets the configuration of service URI and custom headers for the webhook.",
  category: "Webhooks",
  inputs: {
    default: {
      config: {
        registryName: {
          name: "Registry Name",
          description: "Name of the registry",
          type: "string",
          required: true,
        },
        webhookName: {
          name: "Webhook Name",
          description: "Name of the webhook",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/${input.event.inputConfig.registryName}/webhooks/${input.event.inputConfig.webhookName}/getCallbackConfig` +
          "?api-version=2025-04-01";

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
          serviceUri: {
            type: "string",
          },
          customHeaders: {
            type: "object",
            additionalProperties: true,
          },
        },
        required: ["serviceUri"],
      },
    },
  },
};

export default Webhooks_GetCallbackConfig;
