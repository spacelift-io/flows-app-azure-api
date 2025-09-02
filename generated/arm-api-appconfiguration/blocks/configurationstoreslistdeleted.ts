import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ConfigurationStores_ListDeleted: AppBlock = {
  name: "Configuration Stores / List Deleted",
  description:
    "Gets information about the deleted configuration stores in a subscription.",
  category: "Configuration Stores",
  inputs: {
    default: {
      config: {
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.AppConfiguration/deletedConfigurationStores` +
          "?api-version=2024-06-01";

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
        properties: {
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                properties: {
                  type: "object",
                  properties: {
                    configurationStoreId: {
                      type: "string",
                    },
                    location: {
                      type: "string",
                    },
                    deletionDate: {
                      type: "string",
                    },
                    scheduledPurgeDate: {
                      type: "string",
                    },
                    tags: {
                      type: "object",
                      additionalProperties: true,
                    },
                    purgeProtectionEnabled: {
                      type: "boolean",
                    },
                  },
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ConfigurationStores_ListDeleted;
