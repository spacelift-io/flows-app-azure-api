import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const BackupStorageAccount: AppBlock = {
  name: "Backup Storage Account",
  description:
    "Requests that a backup of the specified storage account be downloaded to the client. This operation requires the storage/backup permission.",
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
      },
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/storage/${input.event.inputConfig.storage_account_name}/backup`;

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
          value: {
            type: "string",
          },
        },
      },
    },
  },
};

export default BackupStorageAccount;
