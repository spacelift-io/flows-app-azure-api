import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Capabilities_ListByLocation: AppBlock = {
  name: "Capabilities / List By Location",
  description:
    "Gets the subscription capabilities available for the specified location.",
  category: "Capabilities",
  inputs: {
    default: {
      config: {
        locationName: {
          name: "Location Name",
          description: "Name of the location",
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
        include: {
          name: "Include",
          description:
            "If specified, restricts the response to only include the selected item.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Sql/locations/${input.event.inputConfig.locationName}/capabilities` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.include
            ? `&include=${input.event.inputConfig.include}`
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
          name: {
            type: "string",
          },
          supportedServerVersions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                supportedEditions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      supportedServiceLevelObjectives: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            name: {
                              type: "string",
                            },
                            supportedMaxSizes: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  minValue: {
                                    type: "object",
                                    properties: {
                                      limit: {
                                        type: "integer",
                                      },
                                      unit: {
                                        type: "string",
                                      },
                                    },
                                  },
                                  maxValue: {
                                    type: "object",
                                    properties: {
                                      limit: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      unit: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  scaleSize: {
                                    type: "object",
                                    properties: {
                                      limit: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      unit: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  logSize: {
                                    type: "object",
                                    properties: {
                                      limit: {
                                        type: "integer",
                                      },
                                      unit: {
                                        type: "string",
                                      },
                                    },
                                  },
                                  status: {
                                    type: "string",
                                  },
                                  reason: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            performanceLevel: {
                              type: "object",
                              properties: {
                                value: {
                                  type: "number",
                                },
                                unit: {
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
                            supportedLicenseTypes: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  name: {
                                    type: "string",
                                  },
                                  status: {
                                    type: "string",
                                  },
                                  reason: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            includedMaxSize: {
                              type: "object",
                              properties: {
                                limit: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                unit: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                            },
                            zoneRedundant: {
                              type: "boolean",
                            },
                            supportedAutoPauseDelay: {
                              type: "object",
                              properties: {
                                minValue: {
                                  type: "integer",
                                },
                                maxValue: {
                                  type: "integer",
                                },
                                stepSize: {
                                  type: "integer",
                                },
                                default: {
                                  type: "integer",
                                },
                                unit: {
                                  type: "string",
                                },
                                doNotPauseValue: {
                                  type: "integer",
                                },
                              },
                            },
                            supportedMinCapacities: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  value: {
                                    type: "number",
                                  },
                                  status: {
                                    type: "string",
                                  },
                                  reason: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            computeModel: {
                              type: "string",
                            },
                            supportedMaintenanceConfigurations: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  name: {
                                    type: "string",
                                  },
                                  zoneRedundant: {
                                    type: "boolean",
                                  },
                                  status: {
                                    type: "string",
                                  },
                                  reason: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            zonePinning: {
                              type: "boolean",
                            },
                            supportedZones: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  availabilityZone: {
                                    type: "string",
                                  },
                                  status: {
                                    type: "string",
                                  },
                                  reason: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            supportedFreeLimitExhaustionBehaviors: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  exhaustionBehaviorType: {
                                    type: "string",
                                  },
                                  status: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            status: {
                              type: "string",
                            },
                            reason: {
                              type: "string",
                            },
                          },
                        },
                      },
                      zoneRedundant: {
                        type: "boolean",
                      },
                      readScale: {
                        type: "object",
                        properties: {
                          maxNumberOfReplicas: {
                            type: "integer",
                          },
                          status: {
                            type: "string",
                          },
                          reason: {
                            type: "string",
                          },
                        },
                      },
                      supportedStorageCapabilities: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            storageAccountType: {
                              type: "string",
                            },
                            status: {
                              type: "string",
                            },
                            reason: {
                              type: "string",
                            },
                          },
                        },
                      },
                      zonePinning: {
                        type: "boolean",
                      },
                      status: {
                        type: "string",
                      },
                      reason: {
                        type: "string",
                      },
                    },
                  },
                },
                supportedElasticPoolEditions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      supportedElasticPoolPerformanceLevels: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            performanceLevel: {
                              type: "object",
                              properties: {
                                value: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                unit: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                            },
                            sku: {
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
                            supportedLicenseTypes: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                            maxDatabaseCount: {
                              type: "integer",
                            },
                            includedMaxSize: {
                              type: "object",
                              properties: {
                                limit: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                unit: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                            },
                            supportedMaxSizes: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                            supportedPerDatabaseMaxSizes: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                            supportedPerDatabaseMaxPerformanceLevels: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  limit: {
                                    type: "number",
                                  },
                                  unit: {
                                    type: "string",
                                  },
                                  supportedPerDatabaseMinPerformanceLevels: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        limit: {
                                          type: "number",
                                        },
                                        unit: {
                                          type: "string",
                                        },
                                        status: {
                                          type: "string",
                                        },
                                        reason: {
                                          type: "string",
                                        },
                                      },
                                    },
                                  },
                                  status: {
                                    type: "string",
                                  },
                                  reason: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            zoneRedundant: {
                              type: "boolean",
                            },
                            supportedMaintenanceConfigurations: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                            supportedMinCapacities: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                            supportedAutoPauseDelay: {
                              type: "object",
                              properties: {
                                minValue: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                maxValue: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                stepSize: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                default: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                unit: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                doNotPauseValue: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                            },
                            supportedPerDatabaseAutoPauseDelay: {
                              type: "object",
                              properties: {
                                minValue: {
                                  type: "integer",
                                },
                                maxValue: {
                                  type: "integer",
                                },
                                stepSize: {
                                  type: "integer",
                                },
                                default: {
                                  type: "integer",
                                },
                                unit: {
                                  type: "string",
                                },
                                doNotPauseValue: {
                                  type: "integer",
                                },
                              },
                            },
                            supportedZones: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                            status: {
                              type: "string",
                            },
                            reason: {
                              type: "string",
                            },
                          },
                        },
                      },
                      zoneRedundant: {
                        type: "boolean",
                      },
                      zonePinning: {
                        type: "boolean",
                      },
                      status: {
                        type: "string",
                      },
                      reason: {
                        type: "string",
                      },
                    },
                  },
                },
                status: {
                  type: "string",
                },
                reason: {
                  type: "string",
                },
              },
            },
          },
          supportedManagedInstanceVersions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                supportedEditions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      isGeneralPurposeV2: {
                        type: "boolean",
                      },
                      supportedFamilies: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            sku: {
                              type: "string",
                            },
                            zoneRedundant: {
                              type: "boolean",
                            },
                            supportedLicenseTypes: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  name: {
                                    type: "string",
                                  },
                                  status: {
                                    type: "string",
                                  },
                                  reason: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            supportedVcoresValues: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  name: {
                                    type: "string",
                                  },
                                  value: {
                                    type: "integer",
                                  },
                                  supportedMemoryLimitsMB: {
                                    type: "object",
                                    properties: {
                                      minValue: {
                                        type: "integer",
                                      },
                                      maxValue: {
                                        type: "integer",
                                      },
                                      scaleSize: {
                                        type: "integer",
                                      },
                                      status: {
                                        type: "string",
                                      },
                                      reason: {
                                        type: "string",
                                      },
                                    },
                                  },
                                  includedMaxSize: {
                                    type: "object",
                                    properties: {
                                      limit: {
                                        type: "integer",
                                      },
                                      unit: {
                                        type: "string",
                                      },
                                    },
                                  },
                                  supportedStorageSizes: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        minValue: {
                                          type: "object",
                                          properties: {
                                            limit: {
                                              type: "object",
                                              additionalProperties: true,
                                            },
                                            unit: {
                                              type: "object",
                                              additionalProperties: true,
                                            },
                                          },
                                        },
                                        maxValue: {
                                          type: "object",
                                          properties: {
                                            limit: {
                                              type: "object",
                                              additionalProperties: true,
                                            },
                                            unit: {
                                              type: "object",
                                              additionalProperties: true,
                                            },
                                          },
                                        },
                                        scaleSize: {
                                          type: "object",
                                          properties: {
                                            limit: {
                                              type: "object",
                                              additionalProperties: true,
                                            },
                                            unit: {
                                              type: "object",
                                              additionalProperties: true,
                                            },
                                          },
                                        },
                                        logSize: {
                                          type: "object",
                                          properties: {
                                            limit: {
                                              type: "integer",
                                            },
                                            unit: {
                                              type: "string",
                                            },
                                          },
                                        },
                                        status: {
                                          type: "string",
                                        },
                                        reason: {
                                          type: "string",
                                        },
                                      },
                                    },
                                  },
                                  includedStorageIOps: {
                                    type: "integer",
                                  },
                                  supportedStorageIOps: {
                                    type: "object",
                                    properties: {
                                      minValue: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      maxValue: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      scaleSize: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      status: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      reason: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  iopsMinValueOverrideFactorPerSelectedStorageGB:
                                    {
                                      type: "number",
                                    },
                                  iopsIncludedValueOverrideFactorPerSelectedStorageGB:
                                    {
                                      type: "number",
                                    },
                                  includedStorageThroughputMBps: {
                                    type: "integer",
                                  },
                                  supportedStorageThroughputMBps: {
                                    type: "object",
                                    properties: {
                                      minValue: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      maxValue: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      scaleSize: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      status: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      reason: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  throughputMBpsMinValueOverrideFactorPerSelectedStorageGB:
                                    {
                                      type: "number",
                                    },
                                  throughputMBpsIncludedValueOverrideFactorPerSelectedStorageGB:
                                    {
                                      type: "number",
                                    },
                                  instancePoolSupported: {
                                    type: "boolean",
                                  },
                                  standaloneSupported: {
                                    type: "boolean",
                                  },
                                  supportedMaintenanceConfigurations: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        name: {
                                          type: "string",
                                        },
                                        status: {
                                          type: "string",
                                        },
                                        reason: {
                                          type: "string",
                                        },
                                      },
                                    },
                                  },
                                  status: {
                                    type: "string",
                                  },
                                  reason: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            status: {
                              type: "string",
                            },
                            reason: {
                              type: "string",
                            },
                          },
                        },
                      },
                      supportedStorageCapabilities: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            storageAccountType: {
                              type: "string",
                            },
                            status: {
                              type: "string",
                            },
                            reason: {
                              type: "string",
                            },
                          },
                        },
                      },
                      status: {
                        type: "string",
                      },
                      reason: {
                        type: "string",
                      },
                    },
                  },
                },
                supportedInstancePoolEditions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      supportedFamilies: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            supportedLicenseTypes: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                            supportedVcoresValues: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  name: {
                                    type: "string",
                                  },
                                  value: {
                                    type: "integer",
                                  },
                                  storageLimit: {
                                    type: "object",
                                    properties: {
                                      limit: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      unit: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  status: {
                                    type: "string",
                                  },
                                  reason: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            status: {
                              type: "string",
                            },
                            reason: {
                              type: "string",
                            },
                          },
                        },
                      },
                      status: {
                        type: "string",
                      },
                      reason: {
                        type: "string",
                      },
                    },
                  },
                },
                status: {
                  type: "string",
                },
                reason: {
                  type: "string",
                },
              },
            },
          },
          supportedJobAgentVersions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                supportedEditions: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      supportedServiceLevelObjectives: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
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
                            status: {
                              type: "string",
                            },
                            reason: {
                              type: "string",
                            },
                          },
                        },
                      },
                      status: {
                        type: "string",
                      },
                      reason: {
                        type: "string",
                      },
                    },
                  },
                },
                status: {
                  type: "string",
                },
                reason: {
                  type: "string",
                },
              },
            },
          },
          status: {
            type: "string",
          },
          reason: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Capabilities_ListByLocation;
