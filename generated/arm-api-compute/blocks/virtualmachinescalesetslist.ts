import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachineScaleSets_List: AppBlock = {
  name: "Virtual Machine Scale Sets / List",
  description: "Gets a list of all VM scale sets under a resource group.",
  category: "Virtual Machine Scale Sets",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets` +
          "?api-version=2024-11-01";

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
                properties: {
                  type: "object",
                  properties: {
                    upgradePolicy: {
                      type: "object",
                      properties: {
                        mode: {
                          type: "string",
                        },
                        rollingUpgradePolicy: {
                          type: "object",
                          properties: {
                            maxBatchInstancePercent: {
                              type: "integer",
                            },
                            maxUnhealthyInstancePercent: {
                              type: "integer",
                            },
                            maxUnhealthyUpgradedInstancePercent: {
                              type: "integer",
                            },
                            pauseTimeBetweenBatches: {
                              type: "string",
                            },
                            enableCrossZoneUpgrade: {
                              type: "boolean",
                            },
                            prioritizeUnhealthyInstances: {
                              type: "boolean",
                            },
                            rollbackFailedInstancesOnPolicyBreach: {
                              type: "boolean",
                            },
                            maxSurge: {
                              type: "boolean",
                            },
                          },
                        },
                        automaticOSUpgradePolicy: {
                          type: "object",
                          properties: {
                            enableAutomaticOSUpgrade: {
                              type: "boolean",
                            },
                            disableAutomaticRollback: {
                              type: "boolean",
                            },
                            useRollingUpgradePolicy: {
                              type: "boolean",
                            },
                            osRollingUpgradeDeferral: {
                              type: "boolean",
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
                    automaticRepairsPolicy: {
                      type: "object",
                      properties: {
                        enabled: {
                          type: "boolean",
                        },
                        gracePeriod: {
                          type: "string",
                        },
                        repairAction: {
                          type: "string",
                        },
                      },
                    },
                    virtualMachineProfile: {
                      type: "object",
                      properties: {
                        osProfile: {
                          type: "object",
                          properties: {
                            computerNamePrefix: {
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
                                        bypassPlatformSafetyChecksOnUserSchedule:
                                          {
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
                                        bypassPlatformSafetyChecksOnUserSchedule:
                                          {
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
                                        type: "string",
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
                                name: {
                                  type: "string",
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
                                diskSizeGB: {
                                  type: "integer",
                                },
                                osType: {
                                  type: "string",
                                },
                                image: {
                                  type: "object",
                                  properties: {
                                    uri: {
                                      type: "string",
                                    },
                                  },
                                },
                                vhdContainers: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
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
                                  name: {
                                    type: "string",
                                  },
                                  lun: {
                                    type: "integer",
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
                                  diskIOPSReadWrite: {
                                    type: "integer",
                                  },
                                  diskMBpsReadWrite: {
                                    type: "integer",
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
                          },
                        },
                        networkProfile: {
                          type: "object",
                          properties: {
                            healthProbe: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "string",
                                },
                              },
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
                                                            domainNameLabelScope:
                                                              {
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
                                                        publicIPAddressVersion:
                                                          {
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
                                                applicationGatewayBackendAddressPools:
                                                  {
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
                                                applicationSecurityGroups: {
                                                  type: "array",
                                                  items: {
                                                    type: "object",
                                                    additionalProperties: true,
                                                  },
                                                },
                                                loadBalancerBackendAddressPools:
                                                  {
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
                            networkApiVersion: {
                              type: "string",
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
                        extensionProfile: {
                          type: "object",
                          properties: {
                            extensions: {
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
                                      provisionAfterExtensions: {
                                        type: "array",
                                        items: {
                                          type: "string",
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
                                                type: "object",
                                                additionalProperties: true,
                                              },
                                            },
                                          },
                                        },
                                        required: ["secretUrl", "sourceVault"],
                                      },
                                    },
                                  },
                                  type: {
                                    type: "string",
                                  },
                                  name: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                            extensionsTimeBudget: {
                              type: "string",
                            },
                          },
                        },
                        licenseType: {
                          type: "string",
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
                        hardwareProfile: {
                          type: "object",
                          properties: {
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
                        serviceArtifactReference: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                          },
                        },
                        securityPostureReference: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            excludeExtensions: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            isOverridable: {
                              type: "boolean",
                            },
                          },
                          required: ["id"],
                        },
                        timeCreated: {
                          type: "string",
                        },
                      },
                    },
                    provisioningState: {
                      type: "string",
                    },
                    overprovision: {
                      type: "boolean",
                    },
                    doNotRunExtensionsOnOverprovisionedVMs: {
                      type: "boolean",
                    },
                    uniqueId: {
                      type: "string",
                    },
                    singlePlacementGroup: {
                      type: "boolean",
                    },
                    zoneBalance: {
                      type: "boolean",
                    },
                    platformFaultDomainCount: {
                      type: "integer",
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
                    hostGroup: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
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
                    scaleInPolicy: {
                      type: "object",
                      properties: {
                        rules: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        forceDeletion: {
                          type: "boolean",
                        },
                        prioritizeUnhealthyVMs: {
                          type: "boolean",
                        },
                      },
                    },
                    orchestrationMode: {
                      type: "string",
                    },
                    spotRestorePolicy: {
                      type: "object",
                      properties: {
                        enabled: {
                          type: "boolean",
                        },
                        restoreTimeout: {
                          type: "string",
                        },
                      },
                    },
                    priorityMixPolicy: {
                      type: "object",
                      properties: {
                        baseRegularPriorityCount: {
                          type: "integer",
                        },
                        regularPriorityPercentageAboveBase: {
                          type: "integer",
                        },
                      },
                    },
                    timeCreated: {
                      type: "string",
                    },
                    constrainedMaximumCapacity: {
                      type: "boolean",
                    },
                    resiliencyPolicy: {
                      type: "object",
                      properties: {
                        resilientVMCreationPolicy: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                          },
                        },
                        resilientVMDeletionPolicy: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                          },
                        },
                        automaticZoneRebalancingPolicy: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                            rebalanceStrategy: {
                              type: "string",
                            },
                            rebalanceBehavior: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                    zonalPlatformFaultDomainAlignMode: {
                      type: "string",
                    },
                    skuProfile: {
                      type: "object",
                      properties: {
                        vmSizes: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                              },
                              rank: {
                                type: "integer",
                              },
                            },
                          },
                        },
                        allocationStrategy: {
                          type: "string",
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
                etag: {
                  type: "string",
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

export default VirtualMachineScaleSets_List;
