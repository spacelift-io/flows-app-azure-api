import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const decrypt: AppBlock = {
  name: "decrypt",
  description:
    "The DECRYPT operation decrypts a well-formed block of ciphertext using the target encryption key and specified algorithm. This operation is the reverse of the ENCRYPT operation; only a single block of data may be decrypted, the size of this block is dependent on the target key and the algorithm to be used. The DECRYPT operation applies to asymmetric and symmetric keys stored in Azure Key Vault since it uses the private portion of the key. This operation requires the keys/decrypt permission. Microsoft recommends not to use CBC algorithms for decryption without first ensuring the integrity of the ciphertext using an HMAC, for example. See https://learn.microsoft.com/dotnet/standard/security/vulnerabilities-cbc-mode for more information.",
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

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/keys/${input.event.inputConfig.key_name}/${input.event.inputConfig.key_version}/decrypt`;

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

export default decrypt;
