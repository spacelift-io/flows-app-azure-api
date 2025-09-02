import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DeleteKey: AppBlock = {
  name: "Delete Key",
  description:
    "The delete key operation cannot be used to remove individual versions of a key. This operation removes the cryptographic material associated with the key, which means the key is not usable for Sign/Verify, Wrap/Unwrap or Encrypt/Decrypt operations. This operation requires the keys/delete permission.",
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
      },
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/keys/${input.event.inputConfig.key_name}`;

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
          key: {
            type: "object",
            properties: {
              kid: {
                type: "string",
              },
              kty: {
                type: "string",
              },
              key_ops: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              n: {
                type: "string",
              },
              e: {
                type: "string",
              },
              d: {
                type: "string",
              },
              dp: {
                type: "string",
              },
              dq: {
                type: "string",
              },
              qi: {
                type: "string",
              },
              p: {
                type: "string",
              },
              q: {
                type: "string",
              },
              k: {
                type: "string",
              },
              key_hsm: {
                type: "string",
              },
              crv: {
                type: "string",
              },
              x: {
                type: "string",
              },
              y: {
                type: "string",
              },
            },
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
          release_policy: {
            type: "object",
            properties: {
              contentType: {
                type: "string",
              },
              immutable: {
                type: "boolean",
              },
              data: {
                type: "string",
              },
            },
          },
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

export default DeleteKey;
