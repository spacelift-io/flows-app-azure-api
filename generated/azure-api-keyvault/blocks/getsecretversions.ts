import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetSecretVersions: AppBlock = {
  name: "Get Secret Versions",
  description:
    "The full secret identifier and attributes are provided in the response. No values are returned for the secrets. This operations requires the secrets/list permission.",
  category: "General",
  inputs: {
    default: {
      config: {
        secret_name: {
          name: "Secret Name",
          description: "Name of the secret-",
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
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/secrets/${input.event.inputConfig.secret_name}/versions` +
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
                  },
                },
                tags: {
                  type: "object",
                  additionalProperties: true,
                },
                contentType: {
                  type: "string",
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

export default GetSecretVersions;
