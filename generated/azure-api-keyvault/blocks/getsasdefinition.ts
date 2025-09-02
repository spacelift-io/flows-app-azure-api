import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetSasDefinition: AppBlock = {
  name: "Get Sas Definition",
  description:
    "Gets information about a SAS definition for the specified storage account. This operation requires the storage/getsas permission.",
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
        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/storage/${input.event.inputConfig.storage_account_name}/sas/${input.event.inputConfig.sas_definition_name}`;

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
          sid: {
            type: "string",
          },
          templateUri: {
            type: "string",
          },
          sasType: {
            type: "string",
          },
          validityPeriod: {
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

export default GetSasDefinition;
