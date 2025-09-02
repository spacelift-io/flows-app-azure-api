import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Webhooks_Create: AppBlock = {
  name: "Webhooks / Create",
  description:
    "Creates a webhook for a container registry with the specified parameters.",
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
        webhookCreateParameters: {
          name: "Webhook Create Parameters",
          type: {
            type: "object",
            properties: {
              tags: {
                type: "object",
                additionalProperties: true,
              },
              location: {
                type: "string",
              },
              properties: {
                type: "object",
                properties: {
                  serviceUri: {
                    type: "string",
                  },
                  customHeaders: {
                    type: "object",
                    additionalProperties: true,
                  },
                  status: {
                    type: "string",
                  },
                  scope: {
                    type: "string",
                  },
                  actions: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
                required: ["serviceUri", "actions"],
              },
            },
            required: ["location"],
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
        const requestBody = input.event.inputConfig.webhookCreateParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/${input.event.inputConfig.registryName}/webhooks/${input.event.inputConfig.webhookName}` +
          "?api-version=2025-04-01";

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
              status: {
                type: "string",
              },
              scope: {
                type: "string",
              },
              actions: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              provisioningState: {
                type: "string",
              },
            },
            required: ["actions"],
          },
        },
      },
    },
  },
};

export default Webhooks_Create;
