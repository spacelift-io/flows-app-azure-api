import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const UpdateKeyRotationPolicy: AppBlock = {
  name: "Update Key Rotation Policy",
  description:
    "Set specified members in the key policy. Leave others as undefined. This operation requires the keys/update permission.",
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
        keyRotationPolicy: {
          name: "Key Rotation Policy",
          description: "The policy for the key.",
          type: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              lifetimeActions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    trigger: {
                      type: "object",
                      properties: {
                        timeAfterCreate: {
                          type: "string",
                        },
                        timeBeforeExpiry: {
                          type: "string",
                        },
                      },
                    },
                    action: {
                      type: "object",
                      properties: {
                        type: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              attributes: {
                type: "object",
                properties: {
                  expiryTime: {
                    type: "string",
                  },
                  created: {
                    type: "number",
                  },
                  updated: {
                    type: "number",
                  },
                },
              },
            },
          },
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.keyRotationPolicy;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/keys/${input.event.inputConfig.key_name}/rotationpolicy`;

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
          id: {
            type: "string",
          },
          lifetimeActions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                trigger: {
                  type: "object",
                  properties: {
                    timeAfterCreate: {
                      type: "string",
                    },
                    timeBeforeExpiry: {
                      type: "string",
                    },
                  },
                },
                action: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          attributes: {
            type: "object",
            properties: {
              expiryTime: {
                type: "string",
              },
              created: {
                type: "integer",
              },
              updated: {
                type: "integer",
              },
            },
          },
        },
      },
    },
  },
};

export default UpdateKeyRotationPolicy;
