import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FullBackup: AppBlock = {
  name: "Full Backup",
  description:
    "Creates a full backup using a user-provided SAS token to an Azure blob storage container.",
  category: "General",
  inputs: {
    default: {
      config: {
        azureStorageBlobContainerUri: {
          name: "Azure Storage Blob Container Uri",
          description:
            "Azure blob shared access signature token pointing to a valid Azure blob container where full backup needs to be stored. This token needs to be valid for at least next 24 hours from the time of making this call.",
          type: {
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
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody =
          input.event.inputConfig.azureStorageBlobContainerUri;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/backup`;

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
        additionalProperties: true,
      },
    },
  },
};

export default FullBackup;
