import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const RecoverDeletedSecret: AppBlock = {
  name: "Recover Deleted Secret",
  description:
    "Recovers the deleted secret in the specified vault. This operation can only be performed on a soft-delete enabled vault. This operation requires the secrets/recover permission.",
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
      },
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/deletedsecrets/${input.event.inputConfig.secret_name}/recover`;

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

export default RecoverDeletedSecret;
