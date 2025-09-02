import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const EncryptionScopes_List: AppBlock = {
  name: "Encryption Scopes / List",
  description:
    "Lists all the encryption scopes available under the specified storage account.",
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
        $maxpagesize: {
          name: "Max Page Size",
          description:
            "Optional, specifies the maximum number of encryption scopes that will be included in the list response.",
          type: "number",
          required: false,
        },
        $filter: {
          name: "Filter",
          description:
            "Optional. When specified, only encryption scope names starting with the filter will be listed.",
          type: "string",
          required: false,
        },
        $include: {
          name: "Include",
          description:
            "Optional, when specified, will list encryption scopes with the specific state. Defaults to All",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/encryptionScopes` +
          "?api-version=2025-01-01" +
          (input.event.inputConfig.$maxpagesize
            ? `&$maxpagesize=${input.event.inputConfig.$maxpagesize}`
            : "") +
          (input.event.inputConfig.$filter
            ? `&$filter=${input.event.inputConfig.$filter}`
            : "") +
          (input.event.inputConfig.$include
            ? `&$include=${input.event.inputConfig.$include}`
            : "");

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
          value: {
            type: "array",
            items: {
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default EncryptionScopes_List;
