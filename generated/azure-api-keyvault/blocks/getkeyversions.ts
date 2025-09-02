import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetKeyVersions: AppBlock = {
  name: "Get Key Versions",
  description:
    "The full key identifier, attributes, and tags are provided in the response. This operation requires the keys/list permission.",
  category: "General",
  inputs: {
    default: {
      config: {
        key_name: {
          name: "Key Name",
          description: "Name of the key-",
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
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/keys/${input.event.inputConfig.key_name}/versions` +
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
                kid: {
                  type: "string",
                },
                attributes: {
                  type: "object",
                  properties: {
                    enabled: {
                      type: "boolean",
                    },
                    nbf: {
                      type: "integer",
                    },
                    exp: {
                      type: "integer",
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
                    exportable: {
                      type: "boolean",
                    },
                    hsmPlatform: {
                      type: "string",
                    },
                  },
                },
                tags: {
                  type: "object",
                  additionalProperties: true,
                },
                managed: {
                  type: "boolean",
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

export default GetKeyVersions;
