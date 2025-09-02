import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachineScaleSetVMs_Get: AppBlock = {
  name: "Virtual Machine Scale Set V Ms / Get",
  description: "Gets a virtual machine from a VM scale set.",
  category: "Virtual Machine Scale Set V Ms",
  inputs: {
    default: {
      config: {
        vmScaleSetName: {
          name: "VM Scale Set Name",
          description: "Name of the vm scale set",
          type: "string",
          required: true,
        },
        instanceId: {
          name: "Instance ID",
          description: "Unique identifier",
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
            "The expand expression to apply on the operation. 'InstanceView' will retrieve the instance view of the virtual machine. 'UserData' will retrieve the UserData of the virtual machine.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/${input.event.inputConfig.vmScaleSetName}/virtualMachines/${input.event.inputConfig.instanceId}` +
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
              latestModelApplied: {
                type: "boolean",
              },
              vmId: {
                type: "string",
              },
              instanceView: {
                type: "object",
                properties: {
                  platformUpdateDomain: {
                    type: "integer",
                  },
                  platformFaultDomain: {
                    type: "integer",
                  },
                  rdpThumbPrint: {
                    type: "string",
                  },
                  vmAgent: {
                    type: "object",
                    properties: {
                      vmAgentVersion: {
                        type: "string",
                      },
                      extensionHandlers: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            type: {
                              type: "string",
                            },
                            typeHandlerVersion: {
                              type: "string",
                            },
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
                  maintenanceRedeployStatus: {
                    type: "object",
                    properties: {
                      isCustomerInitiatedMaintenanceAllowed: {
                        type: "boolean",
                      },
                      preMaintenanceWindowStartTime: {
                        type: "string",
                      },
                      preMaintenanceWindowEndTime: {
                        type: "string",
                      },
                      maintenanceWindowStartTime: {
                        type: "string",
                      },
                      maintenanceWindowEndTime: {
                        type: "string",
                      },
                      lastOperationResultCode: {
                        type: "string",
                      },
                      lastOperationMessage: {
                        type: "string",
                      },
                    },
                  },
                  disks: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        encryptionSettings: {
                          type: "array",
                          items: {
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
                        },
                        statuses: {
                          type: "array",
                          items: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                    },
                  },
                  extensions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        type: {
                          type: "string",
                        },
                        typeHandlerVersion: {
                          type: "string",
                        },
                        substatuses: {
                          type: "array",
                          items: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                        statuses: {
                          type: "array",
                          items: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                    },
                  },
                  vmHealth: {
                    type: "object",
                    properties: {
                      status: {
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
                  bootDiagnostics: {
                    type: "object",
                    properties: {
                      consoleScreenshotBlobUri: {
                        type: "string",
                      },
                      serialConsoleLogBlobUri: {
                        type: "string",
                      },
                      status: {
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
                  statuses: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  assignedHost: {
                    type: "string",
                  },
                  placementGroupId: {
                    type: "string",
                  },
                  computerName: {
                    type: "string",
                  },
                  osName: {
                    type: "string",
                  },
                  osVersion: {
                    type: "string",
                  },
                  hyperVGeneration: {
                    type: "string",
                  },
                },
              },
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
              resilientVMDeletionStatus: {
                type: "string",
              },
              storageProfile: {
                type: "object",
                properties: {
                  imageReference: {
                    type: "object",
                    properties: {
                      publisher: {
                        type: "string",
                      },
                      offer: {
                        type: "string",
                      },
                      sku: {
                        type: "string",
                      },
                      version: {
                        type: "string",
                      },
                      exactVersion: {
                        type: "string",
                      },
                      sharedGalleryImageId: {
                        type: "string",
                      },
                      communityGalleryImageId: {
                        type: "string",
                      },
                    },
                  },
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
                            additionalProperties: true,
                          },
                          keyEncryptionKey: {
                            type: "object",
                            additionalProperties: true,
                          },
                          enabled: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                      name: {
                        type: "string",
                      },
                      vhd: {
                        type: "object",
                        properties: {
                          uri: {
                            type: "string",
                          },
                        },
                      },
                      image: {
                        type: "object",
                        properties: {
                          uri: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                      caching: {
                        type: "string",
                      },
                      writeAcceleratorEnabled: {
                        type: "boolean",
                      },
                      diffDiskSettings: {
                        type: "object",
                        properties: {
                          option: {
                            type: "string",
                          },
                          placement: {
                            type: "string",
                          },
                        },
                      },
                      createOption: {
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
                      deleteOption: {
                        type: "string",
                      },
                    },
                    required: ["createOption"],
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
                        vhd: {
                          type: "object",
                          properties: {
                            uri: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                        image: {
                          type: "object",
                          properties: {
                            uri: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                        caching: {
                          type: "string",
                        },
                        writeAcceleratorEnabled: {
                          type: "boolean",
                        },
                        createOption: {
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
                        sourceResource: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                          },
                        },
                        toBeDetached: {
                          type: "boolean",
                        },
                        diskIOPSReadWrite: {
                          type: "integer",
                        },
                        diskMBpsReadWrite: {
                          type: "integer",
                        },
                        detachOption: {
                          type: "string",
                        },
                        deleteOption: {
                          type: "string",
                        },
                      },
                      required: ["lun", "createOption"],
                    },
                  },
                  diskControllerType: {
                    type: "string",
                  },
                  alignRegionalDisksToVMZone: {
                    type: "boolean",
                  },
                },
              },
              additionalCapabilities: {
                type: "object",
                properties: {
                  ultraSSDEnabled: {
                    type: "boolean",
                  },
                  hibernationEnabled: {
                    type: "boolean",
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
              networkProfile: {
                type: "object",
                properties: {
                  networkInterfaces: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        properties: {
                          type: "object",
                          properties: {
                            primary: {
                              type: "boolean",
                            },
                            deleteOption: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                  networkApiVersion: {
                    type: "string",
                  },
                  networkInterfaceConfigurations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        properties: {
                          type: "object",
                          properties: {
                            primary: {
                              type: "boolean",
                            },
                            deleteOption: {
                              type: "string",
                            },
                            enableAcceleratedNetworking: {
                              type: "boolean",
                            },
                            disableTcpStateTracking: {
                              type: "boolean",
                            },
                            enableFpga: {
                              type: "boolean",
                            },
                            enableIPForwarding: {
                              type: "boolean",
                            },
                            networkSecurityGroup: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                            },
                            dnsSettings: {
                              type: "object",
                              properties: {
                                dnsServers: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            ipConfigurations: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  name: {
                                    type: "string",
                                  },
                                  properties: {
                                    type: "object",
                                    properties: {
                                      subnet: {
                                        type: "object",
                                        properties: {
                                          id: {
                                            type: "object",
                                            additionalProperties: true,
                                          },
                                        },
                                      },
                                      primary: {
                                        type: "boolean",
                                      },
                                      publicIPAddressConfiguration: {
                                        type: "object",
                                        properties: {
                                          name: {
                                            type: "string",
                                          },
                                          properties: {
                                            type: "object",
                                            properties: {
                                              idleTimeoutInMinutes: {
                                                type: "integer",
                                              },
                                              deleteOption: {
                                                type: "string",
                                              },
                                              dnsSettings: {
                                                type: "object",
                                                properties: {
                                                  domainNameLabel: {
                                                    type: "string",
                                                  },
                                                  domainNameLabelScope: {
                                                    type: "string",
                                                  },
                                                },
                                                required: ["domainNameLabel"],
                                              },
                                              ipTags: {
                                                type: "array",
                                                items: {
                                                  type: "object",
                                                  properties: {
                                                    ipTagType: {
                                                      type: "string",
                                                    },
                                                    tag: {
                                                      type: "string",
                                                    },
                                                  },
                                                },
                                              },
                                              publicIPPrefix: {
                                                type: "object",
                                                properties: {
                                                  id: {
                                                    type: "object",
                                                    additionalProperties: true,
                                                  },
                                                },
                                              },
                                              publicIPAddressVersion: {
                                                type: "string",
                                              },
                                              publicIPAllocationMethod: {
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
                                            },
                                          },
                                        },
                                        required: ["name"],
                                      },
                                      privateIPAddressVersion: {
                                        type: "string",
                                      },
                                      applicationSecurityGroups: {
                                        type: "array",
                                        items: {
                                          type: "object",
                                          properties: {
                                            id: {
                                              type: "object",
                                              additionalProperties: true,
                                            },
                                          },
                                        },
                                      },
                                      applicationGatewayBackendAddressPools: {
                                        type: "array",
                                        items: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                      loadBalancerBackendAddressPools: {
                                        type: "array",
                                        items: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                    },
                                  },
                                },
                                required: ["name"],
                              },
                            },
                            dscpConfiguration: {
                              type: "object",
                              additionalProperties: true,
                            },
                            auxiliaryMode: {
                              type: "string",
                            },
                            auxiliarySku: {
                              type: "string",
                            },
                          },
                          required: ["ipConfigurations"],
                        },
                      },
                      required: ["name"],
                    },
                  },
                },
              },
              networkProfileConfiguration: {
                type: "object",
                properties: {
                  networkInterfaceConfigurations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        properties: {
                          type: "object",
                          properties: {
                            primary: {
                              type: "boolean",
                            },
                            enableAcceleratedNetworking: {
                              type: "boolean",
                            },
                            disableTcpStateTracking: {
                              type: "boolean",
                            },
                            enableFpga: {
                              type: "boolean",
                            },
                            networkSecurityGroup: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                            },
                            dnsSettings: {
                              type: "object",
                              properties: {
                                dnsServers: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            ipConfigurations: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  name: {
                                    type: "string",
                                  },
                                  properties: {
                                    type: "object",
                                    properties: {
                                      subnet: {
                                        type: "object",
                                        properties: {
                                          id: {
                                            type: "object",
                                            additionalProperties: true,
                                          },
                                        },
                                      },
                                      primary: {
                                        type: "boolean",
                                      },
                                      publicIPAddressConfiguration: {
                                        type: "object",
                                        properties: {
                                          name: {
                                            type: "string",
                                          },
                                          properties: {
                                            type: "object",
                                            properties: {
                                              idleTimeoutInMinutes: {
                                                type: "integer",
                                              },
                                              dnsSettings: {
                                                type: "object",
                                                properties: {
                                                  domainNameLabel: {
                                                    type: "string",
                                                  },
                                                  domainNameLabelScope: {
                                                    type: "string",
                                                  },
                                                },
                                                required: ["domainNameLabel"],
                                              },
                                              ipTags: {
                                                type: "array",
                                                items: {
                                                  type: "object",
                                                  properties: {
                                                    ipTagType: {
                                                      type: "string",
                                                    },
                                                    tag: {
                                                      type: "string",
                                                    },
                                                  },
                                                },
                                              },
                                              publicIPPrefix: {
                                                type: "object",
                                                properties: {
                                                  id: {
                                                    type: "object",
                                                    additionalProperties: true,
                                                  },
                                                },
                                              },
                                              publicIPAddressVersion: {
                                                type: "string",
                                              },
                                              deleteOption: {
                                                type: "string",
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
                                            },
                                          },
                                        },
                                        required: ["name"],
                                      },
                                      privateIPAddressVersion: {
                                        type: "string",
                                      },
                                      applicationGatewayBackendAddressPools: {
                                        type: "array",
                                        items: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                      applicationSecurityGroups: {
                                        type: "array",
                                        items: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                      loadBalancerBackendAddressPools: {
                                        type: "array",
                                        items: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                      loadBalancerInboundNatPools: {
                                        type: "array",
                                        items: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                    },
                                  },
                                },
                                required: ["name"],
                              },
                            },
                            enableIPForwarding: {
                              type: "boolean",
                            },
                            deleteOption: {
                              type: "string",
                            },
                            auxiliaryMode: {
                              type: "string",
                            },
                            auxiliarySku: {
                              type: "string",
                            },
                          },
                          required: ["ipConfigurations"],
                        },
                      },
                      required: ["name"],
                    },
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
              availabilitySet: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              provisioningState: {
                type: "string",
              },
              licenseType: {
                type: "string",
              },
              modelDefinitionApplied: {
                type: "string",
              },
              protectionPolicy: {
                type: "object",
                properties: {
                  protectFromScaleIn: {
                    type: "boolean",
                  },
                  protectFromScaleSetActions: {
                    type: "boolean",
                  },
                },
              },
              userData: {
                type: "string",
              },
              timeCreated: {
                type: "string",
              },
            },
          },
          instanceId: {
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
              capacity: {
                type: "integer",
              },
            },
          },
          plan: {
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
          },
          resources: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    forceUpdateTag: {
                      type: "string",
                    },
                    publisher: {
                      type: "string",
                    },
                    type: {
                      type: "string",
                    },
                    typeHandlerVersion: {
                      type: "string",
                    },
                    autoUpgradeMinorVersion: {
                      type: "boolean",
                    },
                    enableAutomaticUpgrade: {
                      type: "boolean",
                    },
                    settings: {
                      type: "object",
                    },
                    protectedSettings: {
                      type: "object",
                    },
                    provisioningState: {
                      type: "string",
                    },
                    instanceView: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        type: {
                          type: "string",
                        },
                        typeHandlerVersion: {
                          type: "string",
                        },
                        substatuses: {
                          type: "array",
                          items: {
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
                        },
                        statuses: {
                          type: "array",
                          items: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                    },
                    suppressFailures: {
                      type: "boolean",
                    },
                    protectedSettingsFromKeyVault: {
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
                    provisionAfterExtensions: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
          zones: {
            type: "array",
            items: {
              type: "string",
            },
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
          },
          etag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default VirtualMachineScaleSetVMs_Get;
