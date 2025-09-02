import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const BlobContainers_List: AppBlock = {
  name: "Blob Containers / List",
  description:
    "Lists all containers and does not support a prefix like data plane. Also SRP today does not return continuation token.",
  category: "Blob Containers",
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
            "Optional. Specified maximum number of containers that can be included in the list.",
          type: "string",
          required: false,
        },
        $filter: {
          name: "Filter",
          description:
            "Optional. When specified, only container names starting with the filter will be listed.",
          type: "string",
          required: false,
        },
        $include: {
          name: "Include",
          description:
            "Optional, used to include the properties for soft deleted blob containers.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/blobServices/default/containers` +
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
                    version: {
                      type: "string",
                    },
                    deleted: {
                      type: "boolean",
                    },
                    deletedTime: {
                      type: "string",
                    },
                    remainingRetentionDays: {
                      type: "integer",
                    },
                    defaultEncryptionScope: {
                      type: "string",
                    },
                    denyEncryptionScopeOverride: {
                      type: "boolean",
                    },
                    publicAccess: {
                      type: "string",
                    },
                    lastModifiedTime: {
                      type: "string",
                    },
                    leaseStatus: {
                      type: "string",
                    },
                    leaseState: {
                      type: "string",
                    },
                    leaseDuration: {
                      type: "string",
                    },
                    metadata: {
                      type: "object",
                      additionalProperties: true,
                    },
                    immutabilityPolicy: {
                      type: "object",
                      properties: {
                        properties: {
                          type: "object",
                          properties: {
                            immutabilityPeriodSinceCreationInDays: {
                              type: "integer",
                            },
                            state: {
                              type: "string",
                            },
                            allowProtectedAppendWrites: {
                              type: "boolean",
                            },
                            allowProtectedAppendWritesAll: {
                              type: "boolean",
                            },
                          },
                        },
                        etag: {
                          type: "string",
                        },
                        updateHistory: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              update: {
                                type: "string",
                              },
                              immutabilityPeriodSinceCreationInDays: {
                                type: "integer",
                              },
                              timestamp: {
                                type: "string",
                              },
                              objectIdentifier: {
                                type: "string",
                              },
                              tenantId: {
                                type: "string",
                              },
                              upn: {
                                type: "string",
                              },
                              allowProtectedAppendWrites: {
                                type: "boolean",
                              },
                              allowProtectedAppendWritesAll: {
                                type: "boolean",
                              },
                            },
                          },
                        },
                      },
                    },
                    legalHold: {
                      type: "object",
                      properties: {
                        hasLegalHold: {
                          type: "boolean",
                        },
                        tags: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              tag: {
                                type: "string",
                              },
                              timestamp: {
                                type: "string",
                              },
                              objectIdentifier: {
                                type: "string",
                              },
                              tenantId: {
                                type: "string",
                              },
                              upn: {
                                type: "string",
                              },
                            },
                          },
                        },
                        protectedAppendWritesHistory: {
                          type: "object",
                          properties: {
                            allowProtectedAppendWritesAll: {
                              type: "boolean",
                            },
                            timestamp: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                    hasLegalHold: {
                      type: "boolean",
                    },
                    hasImmutabilityPolicy: {
                      type: "boolean",
                    },
                    immutableStorageWithVersioning: {
                      type: "object",
                      properties: {
                        enabled: {
                          type: "boolean",
                        },
                        timeStamp: {
                          type: "string",
                        },
                        migrationState: {
                          type: "string",
                        },
                      },
                    },
                    enableNfsV3RootSquash: {
                      type: "boolean",
                    },
                    enableNfsV3AllSquash: {
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

export default BlobContainers_List;
