import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ConfigurationStores_RegenerateKey: AppBlock = {
  name: "Configuration Stores / Regenerate Key",
  description:
    "Regenerates an access key for the specified configuration store.",
  category: "Configuration Stores",
  inputs: {
    default: {
      config: {
        configStoreName: {
          name: "Config Store Name",
          description: "Name of the config store",
          type: "string",
          required: true,
        },
        regenerateKeyParameters: {
          name: "Regenerate Key Parameters",
          type: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
            },
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
        const requestBody = input.event.inputConfig.regenerateKeyParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/${input.event.inputConfig.configStoreName}/regenerateKey` +
          "?api-version=2024-06-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          value: {
            type: "string",
          },
          connectionString: {
            type: "string",
          },
          lastModified: {
            type: "string",
          },
          readOnly: {
            type: "boolean",
          },
        },
      },
    },
  },
};

export default ConfigurationStores_RegenerateKey;
