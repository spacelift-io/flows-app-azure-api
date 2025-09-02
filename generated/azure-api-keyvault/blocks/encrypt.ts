import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const encrypt: AppBlock = {
  name: "encrypt",
  description:
    "The ENCRYPT operation encrypts an arbitrary sequence of bytes using an encryption key that is stored in Azure Key Vault. Note that the ENCRYPT operation only supports a single block of data, the size of which is dependent on the target key and the encryption algorithm to be used. The ENCRYPT operation is only strictly necessary for symmetric keys stored in Azure Key Vault since protection with an asymmetric key can be performed using public portion of the key. This operation is supported for asymmetric keys as a convenience for callers that have a key-reference but do not have access to the public key material. This operation requires the keys/encrypt permission.",
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

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/keys/${input.event.inputConfig.key_name}/${input.event.inputConfig.key_version}/encrypt`;

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

export default encrypt;
