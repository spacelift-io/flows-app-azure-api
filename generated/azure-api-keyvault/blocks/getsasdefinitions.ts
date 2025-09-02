import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetSasDefinitions: AppBlock = {
  name: "Get Sas Definitions",
  description:
    "List storage SAS definitions for the given storage account. This operation requires the storage/listsas permission.",
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
        maxresults: {
          name: "Max Results",
          description:
            "Maximum number of results to return in a page. If not specified the service will return up to 25 results.",
          type: "number",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/storage/${input.event.inputConfig.storage_account_name}/sas` +
          (input.event.inputConfig.maxresults
            ? `?maxresults=${input.event.inputConfig.maxresults}`
            : "");

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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                sid: {
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default GetSasDefinitions;
