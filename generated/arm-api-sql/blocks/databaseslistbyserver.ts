import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Databases_ListByServer: AppBlock = {
  name: "Databases / List By Server",
  description: "Gets a list of databases.",
  category: "Databases",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
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
        $skipToken: {
          name: "Skip Token",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.$skipToken
            ? `&$skipToken=${input.event.inputConfig.$skipToken}`
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
                sku: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    tier: {
                      type: "string",
                    },
                    size: {
                      type: "string",
                    },
                    family: {
                      type: "string",
                    },
                    capacity: {
                      type: "integer",
                    },
                  },
                  required: ["name"],
                },
                kind: {
                  type: "string",
                },
                managedBy: {
                  type: "string",
                },
                identity: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                    },
                    tenantId: {
                      type: "string",
                    },
                    userAssignedIdentities: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
                properties: {
                  type: "object",
                  properties: {
                    createMode: {
                      type: "string",
                    },
                    collation: {
                      type: "string",
                    },
                    maxSizeBytes: {
                      type: "integer",
                    },
                    sampleName: {
                      type: "string",
                    },
                    elasticPoolId: {
                      type: "string",
                    },
                    sourceDatabaseId: {
                      type: "string",
                    },
                    status: {
                      type: "string",
                    },
                    databaseId: {
                      type: "string",
                    },
                    creationDate: {
                      type: "string",
                    },
                    currentServiceObjectiveName: {
                      type: "string",
                    },
                    requestedServiceObjectiveName: {
                      type: "string",
                    },
                    defaultSecondaryLocation: {
                      type: "string",
                    },
                    failoverGroupId: {
                      type: "string",
                    },
                    restorePointInTime: {
                      type: "string",
                    },
                    sourceDatabaseDeletionDate: {
                      type: "string",
                    },
                    recoveryServicesRecoveryPointId: {
                      type: "string",
                    },
                    longTermRetentionBackupResourceId: {
                      type: "string",
                    },
                    recoverableDatabaseId: {
                      type: "string",
                    },
                    restorableDroppedDatabaseId: {
                      type: "string",
                    },
                    catalogCollation: {
                      type: "string",
                    },
                    zoneRedundant: {
                      type: "boolean",
                    },
                    licenseType: {
                      type: "string",
                    },
                    maxLogSizeBytes: {
                      type: "integer",
                    },
                    earliestRestoreDate: {
                      type: "string",
                    },
                    readScale: {
                      type: "string",
                    },
                    highAvailabilityReplicaCount: {
                      type: "integer",
                    },
                    secondaryType: {
                      type: "string",
                    },
                    currentSku: {
                      type: "object",
                      properties: {
                        name: {
                          type: "object",
                          additionalProperties: true,
                        },
                        tier: {
                          type: "object",
                          additionalProperties: true,
                        },
                        size: {
                          type: "object",
                          additionalProperties: true,
                        },
                        family: {
                          type: "object",
                          additionalProperties: true,
                        },
                        capacity: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                      required: ["name"],
                    },
                    autoPauseDelay: {
                      type: "integer",
                    },
                    currentBackupStorageRedundancy: {
                      type: "string",
                    },
                    requestedBackupStorageRedundancy: {
                      type: "string",
                    },
                    minCapacity: {
                      type: "number",
                    },
                    pausedDate: {
                      type: "string",
                    },
                    resumedDate: {
                      type: "string",
                    },
                    maintenanceConfigurationId: {
                      type: "string",
                    },
                    isLedgerOn: {
                      type: "boolean",
                    },
                    isInfraEncryptionEnabled: {
                      type: "boolean",
                    },
                    federatedClientId: {
                      type: "string",
                    },
                    keys: {
                      type: "object",
                      additionalProperties: true,
                    },
                    encryptionProtector: {
                      type: "string",
                    },
                    preferredEnclaveType: {
                      type: "string",
                    },
                    useFreeLimit: {
                      type: "boolean",
                    },
                    freeLimitExhaustionBehavior: {
                      type: "string",
                    },
                    sourceResourceId: {
                      type: "string",
                    },
                    manualCutover: {
                      type: "boolean",
                    },
                    performCutover: {
                      type: "boolean",
                    },
                    availabilityZone: {
                      type: "string",
                    },
                    encryptionProtectorAutoRotation: {
                      type: "boolean",
                    },
                  },
                },
              },
              required: ["location"],
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

export default Databases_ListByServer;
