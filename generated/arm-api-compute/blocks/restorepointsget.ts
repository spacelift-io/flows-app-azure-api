import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const RestorePoints_Get: AppBlock = {
  name: "Restore Points / Get",
  description: "The operation to get the restore point.",
  category: "Restore Points",
  inputs: {
    default: {
      config: {
        restorePointCollectionName: {
          name: "Restore Point Collection Name",
          description: "Name of the restore point collection",
          type: "string",
          required: true,
        },
        restorePointName: {
          name: "Restore Point Name",
          description: "Name of the restore point",
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
        $expand: {
          name: "Expand",
          description:
            "The expand expression to apply on the operation. 'InstanceView' retrieves information about the run-time state of a restore point.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/${input.event.inputConfig.restorePointCollectionName}/restorePoints/${input.event.inputConfig.restorePointName}` +
          "?api-version=2024-11-01" +
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
          properties: {
            type: "object",
            properties: {
              excludeDisks: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                  },
                },
              },
              sourceMetadata: {
                type: "object",
                properties: {
                  hardwareProfile: {
                    type: "object",
                    properties: {
                      vmSize: {
                        type: "string",
                      },
                      vmSizeProperties: {
                        type: "object",
                        properties: {
                          vCPUsAvailable: {
                            type: "integer",
                          },
                          vCPUsPerCore: {
                            type: "integer",
                          },
                        },
                      },
                    },
                  },
                  storageProfile: {
                    type: "object",
                    properties: {
                      osDisk: {
                        type: "object",
                        properties: {
                          osType: {
                            type: "string",
                          },
                          encryptionSettings: {
                            type: "object",
                            properties: {
                              diskEncryptionKey: {
                                type: "object",
                                properties: {
                                  secretUrl: {
                                    type: "string",
                                  },
                                  sourceVault: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "string",
                                      },
                                    },
                                  },
                                },
                                required: ["secretUrl", "sourceVault"],
                              },
                              keyEncryptionKey: {
                                type: "object",
                                properties: {
                                  keyUrl: {
                                    type: "string",
                                  },
                                  sourceVault: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                },
                                required: ["keyUrl", "sourceVault"],
                              },
                              enabled: {
                                type: "boolean",
                              },
                            },
                          },
                          name: {
                            type: "string",
                          },
                          caching: {
                            type: "string",
                          },
                          diskSizeGB: {
                            type: "integer",
                          },
                          managedDisk: {
                            type: "object",
                            properties: {
                              storageAccountType: {
                                type: "string",
                              },
                              diskEncryptionSet: {
                                type: "object",
                              },
                              securityProfile: {
                                type: "object",
                                properties: {
                                  securityEncryptionType: {
                                    type: "string",
                                  },
                                  diskEncryptionSet: {
                                    type: "object",
                                  },
                                },
                              },
                            },
                          },
                          diskRestorePoint: {
                            type: "object",
                            properties: {
                              encryption: {
                                type: "object",
                                properties: {
                                  diskEncryptionSet: {
                                    type: "object",
                                  },
                                  type: {
                                    type: "string",
                                  },
                                },
                              },
                              sourceDiskRestorePoint: {
                                type: "object",
                                properties: {
                                  id: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                },
                              },
                            },
                          },
                          writeAcceleratorEnabled: {
                            type: "boolean",
                          },
                        },
                      },
                      dataDisks: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            lun: {
                              type: "integer",
                            },
                            name: {
                              type: "string",
                            },
                            caching: {
                              type: "string",
                            },
                            diskSizeGB: {
                              type: "integer",
                            },
                            managedDisk: {
                              type: "object",
                              properties: {
                                storageAccountType: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                diskEncryptionSet: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                securityProfile: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                            },
                            diskRestorePoint: {
                              type: "object",
                              properties: {
                                encryption: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                sourceDiskRestorePoint: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                            },
                            writeAcceleratorEnabled: {
                              type: "boolean",
                            },
                          },
                        },
                      },
                      diskControllerType: {
                        type: "string",
                      },
                    },
                  },
                  osProfile: {
                    type: "object",
                    properties: {
                      computerName: {
                        type: "string",
                      },
                      adminUsername: {
                        type: "string",
                      },
                      adminPassword: {
                        type: "string",
                      },
                      customData: {
                        type: "string",
                      },
                      windowsConfiguration: {
                        type: "object",
                        properties: {
                          provisionVMAgent: {
                            type: "boolean",
                          },
                          enableAutomaticUpdates: {
                            type: "boolean",
                          },
                          timeZone: {
                            type: "string",
                          },
                          additionalUnattendContent: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                passName: {
                                  type: "string",
                                },
                                componentName: {
                                  type: "string",
                                },
                                settingName: {
                                  type: "string",
                                },
                                content: {
                                  type: "string",
                                },
                              },
                            },
                          },
                          patchSettings: {
                            type: "object",
                            properties: {
                              patchMode: {
                                type: "string",
                              },
                              enableHotpatching: {
                                type: "boolean",
                              },
                              assessmentMode: {
                                type: "string",
                              },
                              automaticByPlatformSettings: {
                                type: "object",
                                properties: {
                                  rebootSetting: {
                                    type: "string",
                                  },
                                  bypassPlatformSafetyChecksOnUserSchedule: {
                                    type: "boolean",
                                  },
                                },
                              },
                            },
                          },
                          winRM: {
                            type: "object",
                            properties: {
                              listeners: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    protocol: {
                                      type: "string",
                                    },
                                    certificateUrl: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                            },
                          },
                          enableVMAgentPlatformUpdates: {
                            type: "boolean",
                          },
                        },
                      },
                      linuxConfiguration: {
                        type: "object",
                        properties: {
                          disablePasswordAuthentication: {
                            type: "boolean",
                          },
                          ssh: {
                            type: "object",
                            properties: {
                              publicKeys: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    path: {
                                      type: "string",
                                    },
                                    keyData: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                            },
                          },
                          provisionVMAgent: {
                            type: "boolean",
                          },
                          patchSettings: {
                            type: "object",
                            properties: {
                              patchMode: {
                                type: "string",
                              },
                              assessmentMode: {
                                type: "string",
                              },
                              automaticByPlatformSettings: {
                                type: "object",
                                properties: {
                                  rebootSetting: {
                                    type: "string",
                                  },
                                  bypassPlatformSafetyChecksOnUserSchedule: {
                                    type: "boolean",
                                  },
                                },
                              },
                            },
                          },
                          enableVMAgentPlatformUpdates: {
                            type: "boolean",
                          },
                        },
                      },
                      secrets: {
                        type: "array",
                        items: {
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
                            vaultCertificates: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  certificateUrl: {
                                    type: "string",
                                  },
                                  certificateStore: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                      allowExtensionOperations: {
                        type: "boolean",
                      },
                      requireGuestProvisionSignal: {
                        type: "boolean",
                      },
                    },
                  },
                  diagnosticsProfile: {
                    type: "object",
                    properties: {
                      bootDiagnostics: {
                        type: "object",
                        properties: {
                          enabled: {
                            type: "boolean",
                          },
                          storageUri: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                  licenseType: {
                    type: "string",
                  },
                  vmId: {
                    type: "string",
                  },
                  securityProfile: {
                    type: "object",
                    properties: {
                      uefiSettings: {
                        type: "object",
                        properties: {
                          secureBootEnabled: {
                            type: "boolean",
                          },
                          vTpmEnabled: {
                            type: "boolean",
                          },
                        },
                      },
                      encryptionAtHost: {
                        type: "boolean",
                      },
                      securityType: {
                        type: "string",
                      },
                      encryptionIdentity: {
                        type: "object",
                        properties: {
                          userAssignedIdentityResourceId: {
                            type: "string",
                          },
                        },
                      },
                      proxyAgentSettings: {
                        type: "object",
                        properties: {
                          enabled: {
                            type: "boolean",
                          },
                          mode: {
                            type: "string",
                          },
                          keyIncarnationId: {
                            type: "integer",
                          },
                          wireServer: {
                            type: "object",
                            properties: {
                              mode: {
                                type: "string",
                              },
                              inVMAccessControlProfileReferenceId: {
                                type: "string",
                              },
                            },
                          },
                          imds: {
                            type: "object",
                            properties: {
                              mode: {
                                type: "object",
                                additionalProperties: true,
                              },
                              inVMAccessControlProfileReferenceId: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  location: {
                    type: "string",
                  },
                  userData: {
                    type: "string",
                  },
                  hyperVGeneration: {
                    type: "string",
                  },
                },
              },
              provisioningState: {
                type: "string",
              },
              consistencyMode: {
                type: "string",
              },
              timeCreated: {
                type: "string",
              },
              sourceRestorePoint: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              instanceView: {
                type: "object",
                properties: {
                  diskRestorePoints: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        replicationStatus: {
                          type: "object",
                          properties: {
                            status: {
                              type: "object",
                              properties: {
                                code: {
                                  type: "string",
                                },
                                level: {
                                  type: "string",
                                },
                                displayStatus: {
                                  type: "string",
                                },
                                message: {
                                  type: "string",
                                },
                                time: {
                                  type: "string",
                                },
                              },
                            },
                            completionPercent: {
                              type: "integer",
                            },
                          },
                        },
                      },
                    },
                  },
                  statuses: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        code: {
                          type: "object",
                          additionalProperties: true,
                        },
                        level: {
                          type: "object",
                          additionalProperties: true,
                        },
                        displayStatus: {
                          type: "object",
                          additionalProperties: true,
                        },
                        message: {
                          type: "object",
                          additionalProperties: true,
                        },
                        time: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default RestorePoints_Get;
