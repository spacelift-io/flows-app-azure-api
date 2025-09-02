import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SelectiveKeyRestoreOperation: AppBlock = {
  name: "Selective Key Restore Operation",
  description:
    "Restores all key versions of a given key using user supplied SAS token pointing to a previously stored Azure Blob storage backup folder",
  category: "General",
  inputs: {
    default: {
      config: {
        keyName: {
          name: "Key Name",
          description: "Name of the key",
          type: "string",
          required: true,
        },
        restoreBlobDetails: {
          name: "Restore Blob Details",
          description:
            "The Azure blob SAS token pointing to a folder where the previous successful full backup was stored",
          type: {
            type: "object",
            properties: {
              sasTokenParameters: {
                type: "object",
                properties: {
                  storageResourceUri: {
                    type: "string",
                  },
                  token: {
                    type: "string",
                  },
                  useManagedIdentity: {
                    type: "boolean",
                  },
                },
                required: ["storageResourceUri"],
              },
              folder: {
                type: "string",
              },
            },
            required: ["sasTokenParameters", "folder"],
          },
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.restoreBlobDetails;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/keys/${input.event.inputConfig.keyName}/restore`;

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
        additionalProperties: true,
      },
    },
  },
};

export default SelectiveKeyRestoreOperation;
