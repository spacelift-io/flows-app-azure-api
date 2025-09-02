import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SshPublicKeys_GenerateKeyPair: AppBlock = {
  name: "Ssh Public Keys / Generate Key Pair",
  description:
    "Generates and returns a public/private key pair and populates the SSH public key resource with the public key. The length of the key will be 3072 bits. This operation can only be performed once per SSH public key resource.",
  category: "Ssh Public Keys",
  inputs: {
    default: {
      config: {
        sshPublicKeyName: {
          name: "SSH Public Key Name",
          description: "Name of the ssh public key",
          type: "string",
          required: true,
        },
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
        resourceGroupName: {
          name: "Resource Group Name",
          description:
            "Azure resource group name (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              encryptionType: {
                type: "string",
              },
            },
          },
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/sshPublicKeys/${input.event.inputConfig.sshPublicKeyName}/generateKeyPair` +
          "?api-version=2024-11-01";

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
          privateKey: {
            type: "string",
          },
          publicKey: {
            type: "string",
          },
          id: {
            type: "string",
          },
        },
        required: ["privateKey", "publicKey", "id"],
      },
    },
  },
};

export default SshPublicKeys_GenerateKeyPair;
