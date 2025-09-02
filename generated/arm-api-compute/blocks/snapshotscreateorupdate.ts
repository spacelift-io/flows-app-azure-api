import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Snapshots_CreateOrUpdate: AppBlock = {
  name: "Snapshots / Create Or Update",
  description: "Creates or updates a snapshot.",
  category: "Snapshots",
  inputs: {
    default: {
      config: {
        snapshotName: {
          name: "Snapshot Name",
          description: "Name of the snapshot",
          type: "string",
          required: true,
        },
        snapshot: {
          name: "Snapshot",
          description:
            "Snapshot object supplied in the body of the Put disk operation.",
          type: {
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
                            type: "number",
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
                        type: "number",
                      },
                      logicalSectorSize: {
                        type: "number",
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
                        type: "number",
                      },
                    },
                    required: ["createOption"],
                  },
                  diskSizeGB: {
                    type: "number",
                  },
                  diskSizeBytes: {
                    type: "number",
                  },
                  diskState: {
                    type: "string",
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
                  incremental: {
                    type: "boolean",
                  },
                  incrementalSnapshotFamilyId: {
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
                  networkAccessPolicy: {
                    type: "string",
                  },
                  diskAccessId: {
                    type: "string",
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
                  supportsHibernation: {
                    type: "boolean",
                  },
                  publicNetworkAccess: {
                    type: "string",
                  },
                  completionPercent: {
                    type: "number",
                  },
                  copyCompletionError: {
                    type: "object",
                    properties: {
                      errorCode: {
                        type: "string",
                      },
                      errorMessage: {
                        type: "string",
                      },
                    },
                    required: ["errorCode", "errorMessage"],
                  },
                  dataAccessAuthMode: {
                    type: "string",
                  },
                  snapshotAccessState: {
                    type: "string",
                  },
                },
                required: ["creationData"],
              },
              managedBy: {
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
        const requestBody = input.event.inputConfig.snapshot;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/snapshots/${input.event.inputConfig.snapshotName}` +
          "?api-version=2025-01-02";

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
              diskState: {
                type: "string",
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
              incremental: {
                type: "boolean",
              },
              incrementalSnapshotFamilyId: {
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
              networkAccessPolicy: {
                type: "string",
              },
              diskAccessId: {
                type: "string",
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
              supportsHibernation: {
                type: "boolean",
              },
              publicNetworkAccess: {
                type: "string",
              },
              completionPercent: {
                type: "number",
              },
              copyCompletionError: {
                type: "object",
                properties: {
                  errorCode: {
                    type: "string",
                  },
                  errorMessage: {
                    type: "string",
                  },
                },
                required: ["errorCode", "errorMessage"],
              },
              dataAccessAuthMode: {
                type: "string",
              },
              snapshotAccessState: {
                type: "string",
              },
            },
            required: ["creationData"],
          },
          managedBy: {
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
  },
};

export default Snapshots_CreateOrUpdate;
