import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetDeletedKey: AppBlock = {
  name: "Get Deleted Key",
  description:
    "The Get Deleted Key operation is applicable for soft-delete enabled vaults. While the operation can be invoked on any vault, it will return an error if invoked on a non soft-delete enabled vault. This operation requires the keys/get permission.",
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
        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/deletedkeys/${input.event.inputConfig.key_name}`;

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

export default GetDeletedKey;
