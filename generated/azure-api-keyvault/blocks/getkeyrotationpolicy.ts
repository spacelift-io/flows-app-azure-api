import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetKeyRotationPolicy: AppBlock = {
  name: "Get Key Rotation Policy",
  description:
    "The GetKeyRotationPolicy operation returns the specified key policy resources in the specified key vault. This operation requires the keys/get permission.",
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
        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/keys/${input.event.inputConfig.key_name}/rotationpolicy`;

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

export default GetKeyRotationPolicy;
