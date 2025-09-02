import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Disks_ListByResourceGroup: AppBlock = {
  name: "Disks / List By Resource Group",
  description: "Lists all the disks under a resource group.",
  category: "Disks",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/disks` +
          "?api-version=2025-01-02";

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
                    timeCreated: {
                      type: "string",
                    },
                    osType: {
                      type: "string",
                    },
                    hyperVGeneration: {
                      type: "string",
                    },
                    purchasePlan: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        publisher: {
                          type: "string",
                        },
                        product: {
                          type: "string",
                        },
                        promotionCode: {
                          type: "string",
                        },
                      },
                      required: ["name", "publisher", "product"],
                    },
                    supportedCapabilities: {
                      type: "object",
                      properties: {
                        diskControllerTypes: {
                          type: "string",
                        },
                        acceleratedNetwork: {
                          type: "boolean",
                        },
                        architecture: {
                          type: "string",
                        },
                        supportedSecurityOption: {
                          type: "string",
                        },
                      },
                    },
                    creationData: {
                      type: "object",
                      properties: {
                        createOption: {
                          type: "string",
                        },
                        storageAccountId: {
                          type: "string",
                        },
                        imageReference: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            sharedGalleryImageId: {
                              type: "string",
                            },
                            communityGalleryImageId: {
                              type: "string",
                            },
                            lun: {
                              type: "integer",
                            },
                          },
                        },
                        galleryImageReference: {
                          type: "object",
                          properties: {
                            id: {
                              type: "object",
                              additionalProperties: true,
                            },
                            sharedGalleryImageId: {
                              type: "object",
                              additionalProperties: true,
                            },
                            communityGalleryImageId: {
                              type: "object",
                              additionalProperties: true,
                            },
                            lun: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                        sourceUri: {
                          type: "string",
                        },
                        sourceResourceId: {
                          type: "string",
                        },
                        sourceUniqueId: {
                          type: "string",
                        },
                        uploadSizeBytes: {
                          type: "integer",
                        },
                        logicalSectorSize: {
                          type: "integer",
                        },
                        securityDataUri: {
                          type: "string",
                        },
                        securityMetadataUri: {
                          type: "string",
                        },
                        performancePlus: {
                          type: "boolean",
                        },
                        elasticSanResourceId: {
                          type: "string",
                        },
                        provisionedBandwidthCopySpeed: {
                          type: "string",
                        },
                        instantAccessDurationMinutes: {
                          type: "integer",
                        },
                      },
                      required: ["createOption"],
                    },
                    diskSizeGB: {
                      type: "integer",
                    },
                    diskSizeBytes: {
                      type: "integer",
                    },
                    uniqueId: {
                      type: "string",
                    },
                    encryptionSettingsCollection: {
                      type: "object",
                      properties: {
                        enabled: {
                          type: "boolean",
                        },
                        encryptionSettings: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              diskEncryptionKey: {
                                type: "object",
                                properties: {
                                  sourceVault: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "string",
                                      },
                                    },
                                  },
                                  secretUrl: {
                                    type: "string",
                                  },
                                },
                                required: ["sourceVault", "secretUrl"],
                              },
                              keyEncryptionKey: {
                                type: "object",
                                properties: {
                                  sourceVault: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  keyUrl: {
                                    type: "string",
                                  },
                                },
                                required: ["sourceVault", "keyUrl"],
                              },
                            },
                          },
                        },
                        encryptionSettingsVersion: {
                          type: "string",
                        },
                      },
                      required: ["enabled"],
                    },
                    provisioningState: {
                      type: "string",
                    },
                    diskIOPSReadWrite: {
                      type: "integer",
                    },
                    diskMBpsReadWrite: {
                      type: "integer",
                    },
                    diskIOPSReadOnly: {
                      type: "integer",
                    },
                    diskMBpsReadOnly: {
                      type: "integer",
                    },
                    diskState: {
                      type: "string",
                    },
                    encryption: {
                      type: "object",
                      properties: {
                        diskEncryptionSetId: {
                          type: "string",
                        },
                        type: {
                          type: "string",
                        },
                      },
                    },
                    maxShares: {
                      type: "integer",
                    },
                    shareInfo: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          vmUri: {
                            type: "string",
                          },
                        },
                      },
                    },
                    networkAccessPolicy: {
                      type: "string",
                    },
                    diskAccessId: {
                      type: "string",
                    },
                    burstingEnabledTime: {
                      type: "string",
                    },
                    tier: {
                      type: "string",
                    },
                    burstingEnabled: {
                      type: "boolean",
                    },
                    propertyUpdatesInProgress: {
                      type: "object",
                      properties: {
                        targetTier: {
                          type: "string",
                        },
                      },
                    },
                    supportsHibernation: {
                      type: "boolean",
                    },
                    securityProfile: {
                      type: "object",
                      properties: {
                        securityType: {
                          type: "string",
                        },
                        secureVMDiskEncryptionSetId: {
                          type: "string",
                        },
                      },
                    },
                    completionPercent: {
                      type: "number",
                    },
                    publicNetworkAccess: {
                      type: "string",
                    },
                    dataAccessAuthMode: {
                      type: "string",
                    },
                    optimizedForFrequentAttach: {
                      type: "boolean",
                    },
                    LastOwnershipUpdateTime: {
                      type: "string",
                    },
                    availabilityPolicy: {
                      type: "object",
                      properties: {
                        actionOnDiskDelay: {
                          type: "string",
                        },
                      },
                    },
                  },
                  required: ["creationData"],
                },
                managedBy: {
                  type: "string",
                },
                managedByExtended: {
                  type: "array",
                  items: {
                    type: "string",
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
                  },
                },
                zones: {
                  type: "array",
                  items: {
                    type: "string",
                  },
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
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default Disks_ListByResourceGroup;
