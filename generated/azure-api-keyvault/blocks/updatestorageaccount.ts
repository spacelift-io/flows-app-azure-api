import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const UpdateStorageAccount: AppBlock = {
  name: "Update Storage Account",
  description:
    "Updates the specified attributes associated with the given storage account. This operation requires the storage/set/update permission.",
  category: "General",
  inputs: {
    default: {
      config: {
        storage_account_name: {
          name: "Storage Account Name",
          description: "Name of the storage-account-",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/storage/${input.event.inputConfig.storage_account_name}`;

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
          resourceId: {
            type: "string",
          },
          activeKeyName: {
            type: "string",
          },
          autoRegenerateKey: {
            type: "boolean",
          },
          regenerationPeriod: {
            type: "string",
          },
          attributes: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
              created: {
                type: "integer",
              },
              updated: {
                type: "integer",
              },
              recoverableDays: {
                type: "integer",
              },
              recoveryLevel: {
                type: "string",
              },
            },
          },
          tags: {
            type: "object",
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export default UpdateStorageAccount;
