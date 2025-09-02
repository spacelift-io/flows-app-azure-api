import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LocalUsers_List: AppBlock = {
  name: "Local Users / List",
  description: "List the local users associated with the storage account.",
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
            "Optional, specifies the maximum number of local users that will be included in the list response.",
          type: "number",
          required: false,
        },
        $filter: {
          name: "Filter",
          description:
            "Optional. When specified, only local user names starting with the filter will be listed.",
          type: "string",
          required: false,
        },
        $include: {
          name: "Include",
          description:
            "Optional, when specified, will list local users enabled for the specific protocol. Lists all users by default.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/localUsers` +
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default LocalUsers_List;
