import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StorageAccounts_Update: AppBlock = {
  name: "Storage Accounts / Update",
  description:
    "The update operation can be used to update the SKU, encryption, access tier, or tags for a storage account. It can also be used to map the account to a custom domain. Only one custom domain is supported per storage account; the replacement/change of custom domain is not supported. In order to replace an old custom domain, the old value must be cleared/unregistered before a new value can be set. The update of multiple properties is supported. This call does not change the storage keys for the account. If you want to change the storage account keys, use the regenerate keys operation. The location and name of the storage account cannot be changed after creation.",
  category: "Storage Accounts",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}` +
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
          sku: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              tier: {
                type: "string",
              },
            },
            required: ["name"],
          },
          kind: {
            type: "string",
          },
          identity: {
            type: "object",
            properties: {
              principalId: {
                type: "string",
              },
              tenantId: {
                type: "string",
              },
              type: {
                type: "string",
              },
              userAssignedIdentities: {
                type: "object",
                additionalProperties: true,
              },
            },
            required: ["type"],
          },
          extendedLocation: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              type: {
                type: "string",
              },
            },
          },
          zones: {
            type: "array",
            items: {
              type: "string",
            },
          },
          placement: {
            type: "object",
            properties: {
              zonePlacementPolicy: {
                type: "string",
              },
            },
          },
          properties: {
            type: "object",
            properties: {
              provisioningState: {
                type: "string",
              },
              primaryEndpoints: {
                type: "object",
                properties: {
                  blob: {
                    type: "string",
                  },
                  queue: {
                    type: "string",
                  },
                  table: {
                    type: "string",
                  },
                  file: {
                    type: "string",
                  },
                  web: {
                    type: "string",
                  },
                  dfs: {
                    type: "string",
                  },
                  microsoftEndpoints: {
                    type: "object",
                    properties: {
                      blob: {
                        type: "string",
                      },
                      queue: {
                        type: "string",
                      },
                      table: {
                        type: "string",
                      },
                      file: {
                        type: "string",
                      },
                      web: {
                        type: "string",
                      },
                      dfs: {
                        type: "string",
                      },
                    },
                  },
                  internetEndpoints: {
                    type: "object",
                    properties: {
                      blob: {
                        type: "string",
                      },
                      file: {
                        type: "string",
                      },
                      web: {
                        type: "string",
                      },
                      dfs: {
                        type: "string",
                      },
                    },
                  },
                  ipv6Endpoints: {
                    type: "object",
                    properties: {
                      blob: {
                        type: "string",
                      },
                      queue: {
                        type: "string",
                      },
                      table: {
                        type: "string",
                      },
                      file: {
                        type: "string",
                      },
                      web: {
                        type: "string",
                      },
                      dfs: {
                        type: "string",
                      },
                      microsoftEndpoints: {
                        type: "object",
                        properties: {
                          blob: {
                            type: "object",
                            additionalProperties: true,
                          },
                          queue: {
                            type: "object",
                            additionalProperties: true,
                          },
                          table: {
                            type: "object",
                            additionalProperties: true,
                          },
                          file: {
                            type: "object",
                            additionalProperties: true,
                          },
                          web: {
                            type: "object",
                            additionalProperties: true,
                          },
                          dfs: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                      internetEndpoints: {
                        type: "object",
                        properties: {
                          blob: {
                            type: "object",
                            additionalProperties: true,
                          },
                          file: {
                            type: "object",
                            additionalProperties: true,
                          },
                          web: {
                            type: "object",
                            additionalProperties: true,
                          },
                          dfs: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
              primaryLocation: {
                type: "string",
              },
              statusOfPrimary: {
                type: "string",
              },
              lastGeoFailoverTime: {
                type: "string",
              },
              secondaryLocation: {
                type: "string",
              },
              statusOfSecondary: {
                type: "string",
              },
              creationTime: {
                type: "string",
              },
              customDomain: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  useSubDomainName: {
                    type: "boolean",
                  },
                },
                required: ["name"],
              },
              sasPolicy: {
                type: "object",
                properties: {
                  sasExpirationPeriod: {
                    type: "string",
                  },
                  expirationAction: {
                    type: "string",
                  },
                },
                required: ["sasExpirationPeriod", "expirationAction"],
              },
              keyPolicy: {
                type: "object",
                properties: {
                  keyExpirationPeriodInDays: {
                    type: "integer",
                  },
                },
                required: ["keyExpirationPeriodInDays"],
              },
              keyCreationTime: {
                type: "object",
                properties: {
                  key1: {
                    type: "string",
                  },
                  key2: {
                    type: "string",
                  },
                },
              },
              secondaryEndpoints: {
                type: "object",
                properties: {
                  blob: {
                    type: "object",
                    additionalProperties: true,
                  },
                  queue: {
                    type: "object",
                    additionalProperties: true,
                  },
                  table: {
                    type: "object",
                    additionalProperties: true,
                  },
                  file: {
                    type: "object",
                    additionalProperties: true,
                  },
                  web: {
                    type: "object",
                    additionalProperties: true,
                  },
                  dfs: {
                    type: "object",
                    additionalProperties: true,
                  },
                  microsoftEndpoints: {
                    type: "object",
                    additionalProperties: true,
                  },
                  internetEndpoints: {
                    type: "object",
                    additionalProperties: true,
                  },
                  ipv6Endpoints: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              encryption: {
                type: "object",
                properties: {
                  services: {
                    type: "object",
                    properties: {
                      blob: {
                        type: "object",
                        properties: {
                          enabled: {
                            type: "boolean",
                          },
                          lastEnabledTime: {
                            type: "string",
                          },
                          keyType: {
                            type: "string",
                          },
                        },
                      },
                      file: {
                        type: "object",
                        properties: {
                          enabled: {
                            type: "object",
                            additionalProperties: true,
                          },
                          lastEnabledTime: {
                            type: "object",
                            additionalProperties: true,
                          },
                          keyType: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                      table: {
                        type: "object",
                        properties: {
                          enabled: {
                            type: "object",
                            additionalProperties: true,
                          },
                          lastEnabledTime: {
                            type: "object",
                            additionalProperties: true,
                          },
                          keyType: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                      queue: {
                        type: "object",
                        properties: {
                          enabled: {
                            type: "object",
                            additionalProperties: true,
                          },
                          lastEnabledTime: {
                            type: "object",
                            additionalProperties: true,
                          },
                          keyType: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                    },
                  },
                  keySource: {
                    type: "string",
                  },
                  requireInfrastructureEncryption: {
                    type: "boolean",
                  },
                  keyvaultproperties: {
                    type: "object",
                    properties: {
                      keyname: {
                        type: "string",
                      },
                      keyversion: {
                        type: "string",
                      },
                      keyvaulturi: {
                        type: "string",
                      },
                      currentVersionedKeyIdentifier: {
                        type: "string",
                      },
                      lastKeyRotationTimestamp: {
                        type: "string",
                      },
                      currentVersionedKeyExpirationTimestamp: {
                        type: "string",
                      },
                    },
                  },
                  identity: {
                    type: "object",
                    properties: {
                      userAssignedIdentity: {
                        type: "string",
                      },
                      federatedIdentityClientId: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              accessTier: {
                type: "string",
              },
              azureFilesIdentityBasedAuthentication: {
                type: "object",
                properties: {
                  directoryServiceOptions: {
                    type: "string",
                  },
                  activeDirectoryProperties: {
                    type: "object",
                    properties: {
                      domainName: {
                        type: "string",
                      },
                      netBiosDomainName: {
                        type: "string",
                      },
                      forestName: {
                        type: "string",
                      },
                      domainGuid: {
                        type: "string",
                      },
                      domainSid: {
                        type: "string",
                      },
                      azureStorageSid: {
                        type: "string",
                      },
                      samAccountName: {
                        type: "string",
                      },
                      accountType: {
                        type: "string",
                      },
                    },
                  },
                  defaultSharePermission: {
                    type: "string",
                  },
                  smbOAuthSettings: {
                    type: "object",
                    properties: {
                      isSmbOAuthEnabled: {
                        type: "boolean",
                      },
                    },
                  },
                },
                required: ["directoryServiceOptions"],
              },
              supportsHttpsTrafficOnly: {
                type: "boolean",
              },
              networkAcls: {
                type: "object",
                properties: {
                  bypass: {
                    type: "string",
                  },
                  resourceAccessRules: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        tenantId: {
                          type: "string",
                        },
                        resourceId: {
                          type: "string",
                        },
                      },
                    },
                  },
                  virtualNetworkRules: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        action: {
                          type: "string",
                        },
                        state: {
                          type: "string",
                        },
                      },
                      required: ["id"],
                    },
                  },
                  ipRules: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        value: {
                          type: "string",
                        },
                        action: {
                          type: "string",
                        },
                      },
                      required: ["value"],
                    },
                  },
                  ipv6Rules: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        value: {
                          type: "object",
                          additionalProperties: true,
                        },
                        action: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                      required: ["value"],
                    },
                  },
                  defaultAction: {
                    type: "string",
                  },
                },
                required: ["defaultAction"],
              },
              isSftpEnabled: {
                type: "boolean",
              },
              isLocalUserEnabled: {
                type: "boolean",
              },
              enableExtendedGroups: {
                type: "boolean",
              },
              isHnsEnabled: {
                type: "boolean",
              },
              geoReplicationStats: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                  },
                  lastSyncTime: {
                    type: "string",
                  },
                  canFailover: {
                    type: "boolean",
                  },
                  canPlannedFailover: {
                    type: "boolean",
                  },
                  postFailoverRedundancy: {
                    type: "string",
                  },
                  postPlannedFailoverRedundancy: {
                    type: "string",
                  },
                },
              },
              failoverInProgress: {
                type: "boolean",
              },
              largeFileSharesState: {
                type: "string",
              },
              privateEndpointConnections: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      type: "object",
                      properties: {
                        privateEndpoint: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                          },
                        },
                        privateLinkServiceConnectionState: {
                          type: "object",
                          properties: {
                            status: {
                              type: "string",
                            },
                            description: {
                              type: "string",
                            },
                            actionRequired: {
                              type: "string",
                            },
                          },
                        },
                        provisioningState: {
                          type: "string",
                        },
                      },
                      required: ["privateLinkServiceConnectionState"],
                    },
                  },
                },
              },
              routingPreference: {
                type: "object",
                properties: {
                  routingChoice: {
                    type: "string",
                  },
                  publishMicrosoftEndpoints: {
                    type: "boolean",
                  },
                  publishInternetEndpoints: {
                    type: "boolean",
                  },
                },
              },
              dualStackEndpointPreference: {
                type: "object",
                properties: {
                  publishIpv6Endpoint: {
                    type: "boolean",
                  },
                },
              },
              blobRestoreStatus: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                  },
                  failureReason: {
                    type: "string",
                  },
                  restoreId: {
                    type: "string",
                  },
                  parameters: {
                    type: "object",
                    properties: {
                      timeToRestore: {
                        type: "string",
                      },
                      blobRanges: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            startRange: {
                              type: "string",
                            },
                            endRange: {
                              type: "string",
                            },
                          },
                          required: ["startRange", "endRange"],
                        },
                      },
                    },
                    required: ["timeToRestore", "blobRanges"],
                  },
                },
              },
              allowBlobPublicAccess: {
                type: "boolean",
              },
              minimumTlsVersion: {
                type: "string",
              },
              allowSharedKeyAccess: {
                type: "boolean",
              },
              isNfsV3Enabled: {
                type: "boolean",
              },
              allowCrossTenantReplication: {
                type: "boolean",
              },
              defaultToOAuthAuthentication: {
                type: "boolean",
              },
              publicNetworkAccess: {
                type: "string",
              },
              immutableStorageWithVersioning: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  immutabilityPolicy: {
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
                    },
                  },
                },
              },
              allowedCopyScope: {
                type: "string",
              },
              storageAccountSkuConversionStatus: {
                type: "object",
                properties: {
                  skuConversionStatus: {
                    type: "string",
                  },
                  targetSkuName: {
                    type: "string",
                  },
                  startTime: {
                    type: "string",
                  },
                  endTime: {
                    type: "string",
                  },
                },
              },
              dnsEndpointType: {
                type: "string",
              },
              isSkuConversionBlocked: {
                type: "boolean",
              },
              accountMigrationInProgress: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
  },
};

export default StorageAccounts_Update;
