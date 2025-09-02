import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetDeletedSasDefinition: AppBlock = {
  name: "Get Deleted Sas Definition",
  description:
    "The Get Deleted SAS Definition operation returns the specified deleted SAS definition along with its attributes. This operation requires the storage/getsas permission.",
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
        sas_definition_name: {
          name: "SAS Definition Name",
          description: "Name of the sas-definition-",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/deletedstorage/${input.event.inputConfig.storage_account_name}/sas/${input.event.inputConfig.sas_definition_name}`;

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

export default GetDeletedSasDefinition;
