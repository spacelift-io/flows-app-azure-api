import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const EncryptionScopes_Patch: AppBlock = {
  name: "Encryption Scopes / Patch",
  description:
    "Update encryption scope properties as specified in the request body. Update fails if the specified encryption scope does not already exist.",
  category: "Encryption Scopes",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        encryptionScopeName: {
          name: "Encryption Scope Name",
          description: "Name of the encryption scope",
          type: "string",
          required: true,
        },
        encryptionScope: {
          name: "Encryption Scope",
          description: "Encryption scope properties to be used for the update.",
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
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.encryptionScope;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/encryptionScopes/${input.event.inputConfig.encryptionScopeName}` +
          "?api-version=2025-01-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
          properties: {
            type: "object",
            properties: {
              source: {
                type: "string",
              },
              state: {
                type: "string",
              },
              creationTime: {
                type: "string",
              },
              lastModifiedTime: {
                type: "string",
              },
              keyVaultProperties: {
                type: "object",
                properties: {
                  keyUri: {
                    type: "string",
                  },
                  currentVersionedKeyIdentifier: {
                    type: "string",
                  },
                  lastKeyRotationTimestamp: {
                    type: "string",
                  },
                },
              },
              requireInfrastructureEncryption: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
  },
};

export default EncryptionScopes_Patch;
