import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Databases_CreateOrUpdate: AppBlock = {
  name: "Databases / Create Or Update",
  description: "Creates a new database or updates an existing database.",
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
        databaseName: {
          name: "Database Name",
          description: "Name of the database",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "The requested database resource state.",
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
                  size: {
                    type: "string",
                  },
                  family: {
                    type: "string",
                  },
                  capacity: {
                    type: "number",
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
                    type: "number",
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
                    type: "number",
                  },
                  earliestRestoreDate: {
                    type: "string",
                  },
                  readScale: {
                    type: "string",
                  },
                  highAvailabilityReplicaCount: {
                    type: "number",
                  },
                  secondaryType: {
                    type: "string",
                  },
                  currentSku: {
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
                        type: "number",
                      },
                    },
                    required: ["name"],
                  },
                  autoPauseDelay: {
                    type: "number",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}` +
          "?api-version=2023-08-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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
  },
};

export default Databases_CreateOrUpdate;
