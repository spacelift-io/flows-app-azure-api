import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ConfigurationStores_GetDeleted: AppBlock = {
  name: "Configuration Stores / Get Deleted",
  description: "Gets a deleted Azure app configuration store.",
  category: "Configuration Stores",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        configStoreName: {
          name: "Config Store Name",
          description: "Name of the config store",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.AppConfiguration/locations/${input.event.inputConfig.location}/deletedConfigurationStores/${input.event.inputConfig.configStoreName}` +
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
  },
};

export default ConfigurationStores_GetDeleted;
