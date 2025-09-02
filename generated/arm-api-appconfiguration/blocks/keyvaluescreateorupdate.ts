import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const KeyValues_CreateOrUpdate: AppBlock = {
  name: "Key Values / Create Or Update",
  description:
    "Creates a key-value. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration key-values the data plane API should be used instead.",
  category: "Key Values",
  inputs: {
    default: {
      config: {
        configStoreName: {
          name: "Config Store Name",
          description: "Name of the config store",
          type: "string",
          required: true,
        },
        keyValueName: {
          name: "Key Value Name",
          description: "Name of the key value",
          type: "string",
          required: true,
        },
        keyValueParameters: {
          name: "Key Value Parameters",
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
                  key: {
                    type: "string",
                  },
                  label: {
                    type: "string",
                  },
                  value: {
                    type: "string",
                  },
                  contentType: {
                    type: "string",
                  },
                  eTag: {
                    type: "string",
                  },
                  lastModified: {
                    type: "string",
                  },
                  locked: {
                    type: "boolean",
                  },
                  tags: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
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
        const requestBody = input.event.inputConfig.keyValueParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/${input.event.inputConfig.configStoreName}/keyValues/${input.event.inputConfig.keyValueName}` +
          "?api-version=2024-06-01";

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
              key: {
                type: "string",
              },
              label: {
                type: "string",
              },
              value: {
                type: "string",
              },
              contentType: {
                type: "string",
              },
              eTag: {
                type: "string",
              },
              lastModified: {
                type: "string",
              },
              locked: {
                type: "boolean",
              },
              tags: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
        },
      },
    },
  },
};

export default KeyValues_CreateOrUpdate;
