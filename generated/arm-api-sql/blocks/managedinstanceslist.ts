import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedInstances_List: AppBlock = {
  name: "Managed Instances / List",
  description: "Gets a list of all managed instances in the subscription.",
  category: "Managed Instances",
  inputs: {
    default: {
      config: {
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
        $expand: {
          name: "Expand",
          description: "The child resources to include in the response.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Sql/managedInstances` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.$expand
            ? `&$expand=${input.event.inputConfig.$expand}`
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ManagedInstances_List;
