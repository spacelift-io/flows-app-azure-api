import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const UpdateSecret: AppBlock = {
  name: "Update Secret",
  description:
    "The UPDATE operation changes specified attributes of an existing stored secret. Attributes that are not specified in the request are left unchanged. The value of a secret itself cannot be changed. This operation requires the secrets/set permission.",
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
        secret_version: {
          name: "Secret Version",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              contentType: {
                type: "string",
              },
              attributes: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  nbf: {
                    type: "number",
                  },
                  exp: {
                    type: "number",
                  },
                  created: {
                    type: "number",
                  },
                  updated: {
                    type: "number",
                  },
                  recoverableDays: {
                    type: "number",
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
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/secrets/${input.event.inputConfig.secret_name}/${input.event.inputConfig.secret_version}`;

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
          value: {
            type: "string",
          },
          id: {
            type: "string",
          },
          contentType: {
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
          kid: {
            type: "string",
          },
          managed: {
            type: "boolean",
          },
        },
      },
    },
  },
};

export default UpdateSecret;
