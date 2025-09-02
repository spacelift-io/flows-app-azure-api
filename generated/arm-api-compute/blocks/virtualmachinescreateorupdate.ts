import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachines_CreateOrUpdate: AppBlock = {
  name: "Virtual Machines / Create Or Update",
  description:
    "The operation to create or update a virtual machine. Please note some properties can be set only during virtual machine creation.",
  category: "Virtual Machines",
  inputs: {
    default: {
      config: {
        vmName: {
          name: "VM Name",
          description: "Name of the vm",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              properties: {
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
                            type: "number",
                          },
                          vCPUsPerCore: {
                            type: "number",
                          },
                        },
                      },
                    },
                  },
                  scheduledEventsPolicy: {
                    type: "object",
                    properties: {
                      userInitiatedRedeploy: {
                        type: "object",
                        properties: {
                          automaticallyApprove: {
                            type: "boolean",
                          },
                        },
                      },
                      userInitiatedReboot: {
                        type: "object",
                        properties: {
                          automaticallyApprove: {
                            type: "boolean",
                          },
                        },
                      },
                      scheduledEventsAdditionalPublishingTargets: {
                        type: "object",
                        properties: {
                          eventGridAndResourceGraph: {
                            type: "object",
                            properties: {
                              enable: {
                                type: "boolean",
                              },
                            },
                          },
                        },
                      },
                    },
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
                            type: "number",
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
                              type: "number",
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
                              type: "number",
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
                              type: "number",
                            },
                            diskMBpsReadWrite: {
                              type: "number",
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
                                                    type: "number",
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
                                                    required: [
                                                      "domainNameLabel",
                                                    ],
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
                                          applicationGatewayBackendAddressPools:
                                            {
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
                            type: "number",
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
                  virtualMachineScaleSet: {
                    type: "object",
                    properties: {
                      id: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                  },
                  proximityPlacementGroup: {
                    type: "object",
                    properties: {
                      id: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                  },
                  priority: {
                    type: "string",
                  },
                  evictionPolicy: {
                    type: "string",
                  },
                  billingProfile: {
                    type: "object",
                    properties: {
                      maxPrice: {
                        type: "number",
                      },
                    },
                  },
                  host: {
                    type: "object",
                    properties: {
                      id: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                  },
                  hostGroup: {
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
                  instanceView: {
                    type: "object",
                    properties: {
                      platformUpdateDomain: {
                        type: "number",
                      },
                      platformFaultDomain: {
                        type: "number",
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
                      assignedHost: {
                        type: "string",
                      },
                      statuses: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                      patchStatus: {
                        type: "object",
                        properties: {
                          availablePatchSummary: {
                            type: "object",
                            properties: {
                              status: {
                                type: "string",
                              },
                              assessmentActivityId: {
                                type: "string",
                              },
                              rebootPending: {
                                type: "boolean",
                              },
                              criticalAndSecurityPatchCount: {
                                type: "number",
                              },
                              otherPatchCount: {
                                type: "number",
                              },
                              startTime: {
                                type: "string",
                              },
                              lastModifiedTime: {
                                type: "string",
                              },
                              error: {
                                type: "object",
                                properties: {
                                  details: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        code: {
                                          type: "string",
                                        },
                                        target: {
                                          type: "string",
                                        },
                                        message: {
                                          type: "string",
                                        },
                                      },
                                    },
                                  },
                                  innererror: {
                                    type: "object",
                                    properties: {
                                      exceptiontype: {
                                        type: "string",
                                      },
                                      errordetail: {
                                        type: "string",
                                      },
                                    },
                                  },
                                  code: {
                                    type: "string",
                                  },
                                  target: {
                                    type: "string",
                                  },
                                  message: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                          },
                          lastPatchInstallationSummary: {
                            type: "object",
                            properties: {
                              status: {
                                type: "string",
                              },
                              installationActivityId: {
                                type: "string",
                              },
                              maintenanceWindowExceeded: {
                                type: "boolean",
                              },
                              notSelectedPatchCount: {
                                type: "number",
                              },
                              excludedPatchCount: {
                                type: "number",
                              },
                              pendingPatchCount: {
                                type: "number",
                              },
                              installedPatchCount: {
                                type: "number",
                              },
                              failedPatchCount: {
                                type: "number",
                              },
                              startTime: {
                                type: "string",
                              },
                              lastModifiedTime: {
                                type: "string",
                              },
                              error: {
                                type: "object",
                                properties: {
                                  details: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  innererror: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  code: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  target: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  message: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                },
                              },
                            },
                          },
                          configurationStatuses: {
                            type: "array",
                            items: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                      },
                      isVMInStandbyPool: {
                        type: "boolean",
                      },
                    },
                  },
                  licenseType: {
                    type: "string",
                  },
                  vmId: {
                    type: "string",
                  },
                  extensionsTimeBudget: {
                    type: "string",
                  },
                  platformFaultDomain: {
                    type: "number",
                  },
                  scheduledEventsProfile: {
                    type: "object",
                    properties: {
                      terminateNotificationProfile: {
                        type: "object",
                        properties: {
                          notBeforeTimeout: {
                            type: "string",
                          },
                          enable: {
                            type: "boolean",
                          },
                        },
                      },
                      osImageNotificationProfile: {
                        type: "object",
                        properties: {
                          notBeforeTimeout: {
                            type: "string",
                          },
                          enable: {
                            type: "boolean",
                          },
                        },
                      },
                    },
                  },
                  userData: {
                    type: "string",
                  },
                  capacityReservation: {
                    type: "object",
                    properties: {
                      capacityReservationGroup: {
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
                  applicationProfile: {
                    type: "object",
                    properties: {
                      galleryApplications: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            tags: {
                              type: "string",
                            },
                            order: {
                              type: "number",
                            },
                            packageReferenceId: {
                              type: "string",
                            },
                            configurationReference: {
                              type: "string",
                            },
                            treatFailureAsDeploymentFailure: {
                              type: "boolean",
                            },
                            enableAutomaticUpgrade: {
                              type: "boolean",
                            },
                          },
                          required: ["packageReferenceId"],
                        },
                      },
                    },
                  },
                  timeCreated: {
                    type: "string",
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
                          type: "string",
                        },
                        protectedSettings: {
                          type: "string",
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
              managedBy: {
                type: "string",
              },
              etag: {
                type: "string",
              },
              placement: {
                type: "object",
                properties: {
                  zonePlacementPolicy: {
                    type: "string",
                  },
                  includeZones: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  excludeZones: {
                    type: "array",
                    items: {
                      type: "string",
                    },
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
        If_Match: {
          name: "If Match",
          description:
            "The ETag of the transformation. Omit this value to always overwrite the current resource. Specify the last-seen ETag value to prevent accidentally overwriting concurrent changes.",
          type: "string",
          required: false,
        },
        If_None_Match: {
          name: "If None Match",
          description:
            "Set to '*' to allow a new record set to be created, but to prevent updating an existing record set. Other values will result in error from server as they are not supported.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.If_Match) {
          additionalHeaders["If-Match"] = String(
            input.event.inputConfig.If_Match,
          );
        }
        if (input.event.inputConfig.If_None_Match) {
          additionalHeaders["If-None-Match"] = String(
            input.event.inputConfig.If_None_Match,
          );
        }

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${input.event.inputConfig.vmName}` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
          requestBody,
          additionalHeaders,
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
              scheduledEventsPolicy: {
                type: "object",
                properties: {
                  userInitiatedRedeploy: {
                    type: "object",
                    properties: {
                      automaticallyApprove: {
                        type: "boolean",
                      },
                    },
                  },
                  userInitiatedReboot: {
                    type: "object",
                    properties: {
                      automaticallyApprove: {
                        type: "boolean",
                      },
                    },
                  },
                  scheduledEventsAdditionalPublishingTargets: {
                    type: "object",
                    properties: {
                      eventGridAndResourceGraph: {
                        type: "object",
                        properties: {
                          enable: {
                            type: "boolean",
                          },
                        },
                      },
                    },
                  },
                },
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
              virtualMachineScaleSet: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              proximityPlacementGroup: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              priority: {
                type: "string",
              },
              evictionPolicy: {
                type: "string",
              },
              billingProfile: {
                type: "object",
                properties: {
                  maxPrice: {
                    type: "number",
                  },
                },
              },
              host: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              hostGroup: {
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
              instanceView: {
                type: "object",
                properties: {
                  platformUpdateDomain: {
                    type: "integer",
                  },
                  platformFaultDomain: {
                    type: "integer",
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
                  assignedHost: {
                    type: "string",
                  },
                  statuses: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  patchStatus: {
                    type: "object",
                    properties: {
                      availablePatchSummary: {
                        type: "object",
                        properties: {
                          status: {
                            type: "string",
                          },
                          assessmentActivityId: {
                            type: "string",
                          },
                          rebootPending: {
                            type: "boolean",
                          },
                          criticalAndSecurityPatchCount: {
                            type: "integer",
                          },
                          otherPatchCount: {
                            type: "integer",
                          },
                          startTime: {
                            type: "string",
                          },
                          lastModifiedTime: {
                            type: "string",
                          },
                          error: {
                            type: "object",
                            properties: {
                              details: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    code: {
                                      type: "string",
                                    },
                                    target: {
                                      type: "string",
                                    },
                                    message: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                              innererror: {
                                type: "object",
                                properties: {
                                  exceptiontype: {
                                    type: "string",
                                  },
                                  errordetail: {
                                    type: "string",
                                  },
                                },
                              },
                              code: {
                                type: "string",
                              },
                              target: {
                                type: "string",
                              },
                              message: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                      lastPatchInstallationSummary: {
                        type: "object",
                        properties: {
                          status: {
                            type: "string",
                          },
                          installationActivityId: {
                            type: "string",
                          },
                          maintenanceWindowExceeded: {
                            type: "boolean",
                          },
                          notSelectedPatchCount: {
                            type: "integer",
                          },
                          excludedPatchCount: {
                            type: "integer",
                          },
                          pendingPatchCount: {
                            type: "integer",
                          },
                          installedPatchCount: {
                            type: "integer",
                          },
                          failedPatchCount: {
                            type: "integer",
                          },
                          startTime: {
                            type: "string",
                          },
                          lastModifiedTime: {
                            type: "string",
                          },
                          error: {
                            type: "object",
                            properties: {
                              details: {
                                type: "object",
                                additionalProperties: true,
                              },
                              innererror: {
                                type: "object",
                                additionalProperties: true,
                              },
                              code: {
                                type: "object",
                                additionalProperties: true,
                              },
                              target: {
                                type: "object",
                                additionalProperties: true,
                              },
                              message: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                          },
                        },
                      },
                      configurationStatuses: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                  },
                  isVMInStandbyPool: {
                    type: "boolean",
                  },
                },
              },
              licenseType: {
                type: "string",
              },
              vmId: {
                type: "string",
              },
              extensionsTimeBudget: {
                type: "string",
              },
              platformFaultDomain: {
                type: "integer",
              },
              scheduledEventsProfile: {
                type: "object",
                properties: {
                  terminateNotificationProfile: {
                    type: "object",
                    properties: {
                      notBeforeTimeout: {
                        type: "string",
                      },
                      enable: {
                        type: "boolean",
                      },
                    },
                  },
                  osImageNotificationProfile: {
                    type: "object",
                    properties: {
                      notBeforeTimeout: {
                        type: "string",
                      },
                      enable: {
                        type: "boolean",
                      },
                    },
                  },
                },
              },
              userData: {
                type: "string",
              },
              capacityReservation: {
                type: "object",
                properties: {
                  capacityReservationGroup: {
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
              applicationProfile: {
                type: "object",
                properties: {
                  galleryApplications: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        tags: {
                          type: "string",
                        },
                        order: {
                          type: "integer",
                        },
                        packageReferenceId: {
                          type: "string",
                        },
                        configurationReference: {
                          type: "string",
                        },
                        treatFailureAsDeploymentFailure: {
                          type: "boolean",
                        },
                        enableAutomaticUpgrade: {
                          type: "boolean",
                        },
                      },
                      required: ["packageReferenceId"],
                    },
                  },
                },
              },
              timeCreated: {
                type: "string",
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
          managedBy: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          placement: {
            type: "object",
            properties: {
              zonePlacementPolicy: {
                type: "string",
              },
              includeZones: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              excludeZones: {
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
  },
};

export default VirtualMachines_CreateOrUpdate;
