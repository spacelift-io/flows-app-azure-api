import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DeleteStorageAccount: AppBlock = {
  name: "Delete Storage Account",
  description:
    "Deletes a storage account. This operation requires the storage/delete permission.",
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
        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/storage/${input.event.inputConfig.storage_account_name}`;

        const result = await makeAzureRequest(
          input,
          url,
          "DELETE",
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
          recoveryId: {
            type: "string",
          },
          scheduledPurgeDate: {
            type: "integer",
          },
          deletedDate: {
            type: "integer",
          },
        },
      },
    },
  },
};

export default DeleteStorageAccount;
