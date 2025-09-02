import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedInstances_Update: AppBlock = {
  name: "Managed Instances / Update",
  description: "Updates a managed instance.",
  category: "Managed Instances",
  inputs: {
    default: {
      config: {
        managedInstanceName: {
          name: "Managed Instance Name",
          description: "Name of the managed instance",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "The requested managed instance resource state.",
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
              identity: {
                type: "object",
                properties: {
                  userAssignedIdentities: {
                    type: "object",
                    additionalProperties: true,
                  },
                  principalId: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                  tenantId: {
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
                  managedInstanceCreateMode: {
                    type: "string",
                  },
                  fullyQualifiedDomainName: {
                    type: "string",
                  },
                  isGeneralPurposeV2: {
                    type: "boolean",
                  },
                  administratorLogin: {
                    type: "string",
                  },
                  administratorLoginPassword: {
                    type: "string",
                  },
                  subnetId: {
                    type: "string",
                  },
                  state: {
                    type: "string",
                  },
                  licenseType: {
                    type: "string",
                  },
                  hybridSecondaryUsage: {
                    type: "string",
                  },
                  hybridSecondaryUsageDetected: {
                    type: "string",
                  },
                  vCores: {
                    type: "number",
                  },
                  storageSizeInGB: {
                    type: "number",
                  },
                  storageIOps: {
                    type: "number",
                  },
                  storageThroughputMBps: {
                    type: "number",
                  },
                  collation: {
                    type: "string",
                  },
                  dnsZone: {
                    type: "string",
                  },
                  dnsZonePartner: {
                    type: "string",
                  },
                  publicDataEndpointEnabled: {
                    type: "boolean",
                  },
                  sourceManagedInstanceId: {
                    type: "string",
                  },
                  restorePointInTime: {
                    type: "string",
                  },
                  proxyOverride: {
                    type: "string",
                  },
                  timezoneId: {
                    type: "string",
                  },
                  instancePoolId: {
                    type: "string",
                  },
                  maintenanceConfigurationId: {
                    type: "string",
                  },
                  privateEndpointConnections: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
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
                                actionsRequired: {
                                  type: "string",
                                },
                              },
                              required: ["status", "description"],
                            },
                            provisioningState: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                  minimalTlsVersion: {
                    type: "string",
                  },
                  currentBackupStorageRedundancy: {
                    type: "string",
                  },
                  requestedBackupStorageRedundancy: {
                    type: "string",
                  },
                  zoneRedundant: {
                    type: "boolean",
                  },
                  primaryUserAssignedIdentityId: {
                    type: "string",
                  },
                  keyId: {
                    type: "string",
                  },
                  administrators: {
                    type: "object",
                    properties: {
                      administratorType: {
                        type: "string",
                      },
                      principalType: {
                        type: "string",
                      },
                      login: {
                        type: "string",
                      },
                      sid: {
                        type: "string",
                      },
                      tenantId: {
                        type: "string",
                      },
                      azureADOnlyAuthentication: {
                        type: "boolean",
                      },
                    },
                  },
                  servicePrincipal: {
                    type: "object",
                    properties: {
                      principalId: {
                        type: "string",
                      },
                      clientId: {
                        type: "string",
                      },
                      tenantId: {
                        type: "string",
                      },
                      type: {
                        type: "string",
                      },
                    },
                  },
                  virtualClusterId: {
                    type: "string",
                  },
                  externalGovernanceStatus: {
                    type: "string",
                  },
                  pricingModel: {
                    type: "string",
                  },
                  createTime: {
                    type: "string",
                  },
                  authenticationMetadata: {
                    type: "string",
                  },
                  databaseFormat: {
                    type: "string",
                  },
                },
              },
              tags: {
                type: "object",
                additionalProperties: true,
              },
            },
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}` +
          "?api-version=2023-08-01";

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
          identity: {
            type: "object",
            properties: {
              userAssignedIdentities: {
                type: "object",
                additionalProperties: true,
              },
              principalId: {
                type: "string",
              },
              type: {
                type: "string",
              },
              tenantId: {
                type: "string",
              },
            },
          },
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
          properties: {
            type: "object",
            properties: {
              provisioningState: {
                type: "string",
              },
              managedInstanceCreateMode: {
                type: "string",
              },
              fullyQualifiedDomainName: {
                type: "string",
              },
              isGeneralPurposeV2: {
                type: "boolean",
              },
              administratorLogin: {
                type: "string",
              },
              administratorLoginPassword: {
                type: "string",
              },
              subnetId: {
                type: "string",
              },
              state: {
                type: "string",
              },
              licenseType: {
                type: "string",
              },
              hybridSecondaryUsage: {
                type: "string",
              },
              hybridSecondaryUsageDetected: {
                type: "string",
              },
              vCores: {
                type: "integer",
              },
              storageSizeInGB: {
                type: "integer",
              },
              storageIOps: {
                type: "integer",
              },
              storageThroughputMBps: {
                type: "integer",
              },
              collation: {
                type: "string",
              },
              dnsZone: {
                type: "string",
              },
              dnsZonePartner: {
                type: "string",
              },
              publicDataEndpointEnabled: {
                type: "boolean",
              },
              sourceManagedInstanceId: {
                type: "string",
              },
              restorePointInTime: {
                type: "string",
              },
              proxyOverride: {
                type: "string",
              },
              timezoneId: {
                type: "string",
              },
              instancePoolId: {
                type: "string",
              },
              maintenanceConfigurationId: {
                type: "string",
              },
              privateEndpointConnections: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
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
                            actionsRequired: {
                              type: "string",
                            },
                          },
                          required: ["status", "description"],
                        },
                        provisioningState: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              minimalTlsVersion: {
                type: "string",
              },
              currentBackupStorageRedundancy: {
                type: "string",
              },
              requestedBackupStorageRedundancy: {
                type: "string",
              },
              zoneRedundant: {
                type: "boolean",
              },
              primaryUserAssignedIdentityId: {
                type: "string",
              },
              keyId: {
                type: "string",
              },
              administrators: {
                type: "object",
                properties: {
                  administratorType: {
                    type: "string",
                  },
                  principalType: {
                    type: "string",
                  },
                  login: {
                    type: "string",
                  },
                  sid: {
                    type: "string",
                  },
                  tenantId: {
                    type: "string",
                  },
                  azureADOnlyAuthentication: {
                    type: "boolean",
                  },
                },
              },
              servicePrincipal: {
                type: "object",
                properties: {
                  principalId: {
                    type: "string",
                  },
                  clientId: {
                    type: "string",
                  },
                  tenantId: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                },
              },
              virtualClusterId: {
                type: "string",
              },
              externalGovernanceStatus: {
                type: "string",
              },
              pricingModel: {
                type: "string",
              },
              createTime: {
                type: "string",
              },
              authenticationMetadata: {
                type: "string",
              },
              databaseFormat: {
                type: "string",
              },
            },
          },
        },
        required: ["location"],
      },
    },
  },
};

export default ManagedInstances_Update;
