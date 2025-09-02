import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ImportKey: AppBlock = {
  name: "Import Key",
  description:
    "The import key operation may be used to import any key type into an Azure Key Vault. If the named key already exists, Azure Key Vault creates a new version of the key. This operation requires the keys/import permission.",
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
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              Hsm: {
                type: "boolean",
              },
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
            },
            required: ["key"],
          },
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/keys/${input.event.inputConfig.key_name}`;

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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
        },
      },
    },
  },
};

export default ImportKey;
