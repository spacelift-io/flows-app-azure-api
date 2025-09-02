import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LocalUsers_Get: AppBlock = {
  name: "Local Users / Get",
  description: "Get the local user of the storage account by username.",
  category: "Local Users",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        username: {
          name: "User Name",
          description: "Name of the user",
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
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/localUsers/${input.event.inputConfig.username}` +
          "?api-version=2025-01-01";

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
          properties: {
            type: "object",
            properties: {
              permissionScopes: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    permissions: {
                      type: "string",
                    },
                    service: {
                      type: "string",
                    },
                    resourceName: {
                      type: "string",
                    },
                  },
                  required: ["permissions", "service", "resourceName"],
                },
              },
              homeDirectory: {
                type: "string",
              },
              sshAuthorizedKeys: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    description: {
                      type: "string",
                    },
                    key: {
                      type: "string",
                    },
                  },
                },
              },
              sid: {
                type: "string",
              },
              hasSharedKey: {
                type: "boolean",
              },
              hasSshKey: {
                type: "boolean",
              },
              hasSshPassword: {
                type: "boolean",
              },
              userId: {
                type: "integer",
              },
              groupId: {
                type: "integer",
              },
              allowAclAuthorization: {
                type: "boolean",
              },
              extendedGroups: {
                type: "array",
                items: {
                  type: "integer",
                },
              },
              isNFSv3Enabled: {
                type: "boolean",
              },
            },
          },
          systemData: {
            type: "object",
            properties: {
              createdBy: {
                type: "string",
              },
              createdByType: {
                type: "string",
              },
              createdAt: {
                type: "string",
              },
              lastModifiedBy: {
                type: "string",
              },
              lastModifiedByType: {
                type: "string",
              },
              lastModifiedAt: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default LocalUsers_Get;
