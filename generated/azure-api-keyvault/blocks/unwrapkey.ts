import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const unwrapKey: AppBlock = {
  name: "unwrap Key",
  description:
    "The UNWRAP operation supports decryption of a symmetric key using the target key encryption key. This operation is the reverse of the WRAP operation. The UNWRAP operation applies to asymmetric and symmetric keys stored in Azure Key Vault since it uses the private portion of the key. This operation requires the keys/unwrapKey permission.",
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
        key_version: {
          name: "Key Version",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              alg: {
                type: "string",
              },
              value: {
                type: "string",
              },
              iv: {
                type: "string",
              },
              aad: {
                type: "string",
              },
              tag: {
                type: "string",
              },
            },
            required: ["alg", "value"],
          },
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/keys/${input.event.inputConfig.key_name}/${input.event.inputConfig.key_version}/unwrapkey`;

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          kid: {
            type: "string",
          },
          value: {
            type: "string",
          },
          iv: {
            type: "string",
          },
          tag: {
            type: "string",
          },
          aad: {
            type: "string",
          },
        },
      },
    },
  },
};

export default unwrapKey;
