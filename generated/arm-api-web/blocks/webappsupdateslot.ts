import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_UpdateSlot: AppBlock = {
  name: "Web Apps / Update Slot",
  description:
    "Description for Creates a new web, mobile, or API app in an existing resource group, or updates an existing app.",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        slot: {
          name: "Slot",
          type: "string",
          required: true,
        },
        siteEnvelope: {
          name: "Site Envelope",
          description:
            "A JSON representation of the app properties. See example.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  state: {
                    type: "string",
                  },
                  hostNames: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  repositorySiteName: {
                    type: "string",
                  },
                  usageState: {
                    type: "string",
                  },
                  enabled: {
                    type: "boolean",
                  },
                  enabledHostNames: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  availabilityState: {
                    type: "string",
                  },
                  hostNameSslStates: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        sslState: {
                          type: "string",
                        },
                        virtualIP: {
                          type: "string",
                        },
                        thumbprint: {
                          type: "string",
                        },
                        toUpdate: {
                          type: "boolean",
                        },
                        hostType: {
                          type: "string",
                        },
                      },
                    },
                  },
                  serverFarmId: {
                    type: "string",
                  },
                  reserved: {
                    type: "boolean",
                  },
                  isXenon: {
                    type: "boolean",
                  },
                  hyperV: {
                    type: "boolean",
                  },
                  lastModifiedTimeUtc: {
                    type: "string",
                  },
                  dnsConfiguration: {
                    type: "object",
                    properties: {
                      dnsServers: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      dnsAltServer: {
                        type: "string",
                      },
                      dnsRetryAttemptTimeout: {
                        type: "number",
                      },
                      dnsRetryAttemptCount: {
                        type: "number",
                      },
                      dnsMaxCacheTimeout: {
                        type: "number",
                      },
                      dnsLegacySortOrder: {
                        type: "boolean",
                      },
                    },
                  },
                  siteConfig: {
                    type: "object",
                    properties: {
                      numberOfWorkers: {
                        type: "number",
                      },
                      defaultDocuments: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      netFrameworkVersion: {
                        type: "string",
                      },
                      phpVersion: {
                        type: "string",
                      },
                      pythonVersion: {
                        type: "string",
                      },
                      nodeVersion: {
                        type: "string",
                      },
                      powerShellVersion: {
                        type: "string",
                      },
                      linuxFxVersion: {
                        type: "string",
                      },
                      windowsFxVersion: {
                        type: "string",
                      },
                      requestTracingEnabled: {
                        type: "boolean",
                      },
                      requestTracingExpirationTime: {
                        type: "string",
                      },
                      remoteDebuggingEnabled: {
                        type: "boolean",
                      },
                      remoteDebuggingVersion: {
                        type: "string",
                      },
                      httpLoggingEnabled: {
                        type: "boolean",
                      },
                      acrUseManagedIdentityCreds: {
                        type: "boolean",
                      },
                      acrUserManagedIdentityID: {
                        type: "string",
                      },
                      logsDirectorySizeLimit: {
                        type: "number",
                      },
                      detailedErrorLoggingEnabled: {
                        type: "boolean",
                      },
                      publishingUsername: {
                        type: "string",
                      },
                      appSettings: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            value: {
                              type: "string",
                            },
                          },
                        },
                      },
                      metadata: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                      connectionStrings: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            connectionString: {
                              type: "string",
                            },
                            type: {
                              type: "string",
                            },
                          },
                        },
                      },
                      machineKey: {
                        type: "object",
                        properties: {
                          validation: {
                            type: "string",
                          },
                          validationKey: {
                            type: "string",
                          },
                          decryption: {
                            type: "string",
                          },
                          decryptionKey: {
                            type: "string",
                          },
                        },
                      },
                      handlerMappings: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            extension: {
                              type: "string",
                            },
                            scriptProcessor: {
                              type: "string",
                            },
                            arguments: {
                              type: "string",
                            },
                          },
                        },
                      },
                      documentRoot: {
                        type: "string",
                      },
                      scmType: {
                        type: "string",
                      },
                      use32BitWorkerProcess: {
                        type: "boolean",
                      },
                      webSocketsEnabled: {
                        type: "boolean",
                      },
                      alwaysOn: {
                        type: "boolean",
                      },
                      javaVersion: {
                        type: "string",
                      },
                      javaContainer: {
                        type: "string",
                      },
                      javaContainerVersion: {
                        type: "string",
                      },
                      appCommandLine: {
                        type: "string",
                      },
                      managedPipelineMode: {
                        type: "string",
                      },
                      virtualApplications: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            virtualPath: {
                              type: "string",
                            },
                            physicalPath: {
                              type: "string",
                            },
                            preloadEnabled: {
                              type: "boolean",
                            },
                            virtualDirectories: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  virtualPath: {
                                    type: "string",
                                  },
                                  physicalPath: {
                                    type: "string",
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                      loadBalancing: {
                        type: "string",
                      },
                      experiments: {
                        type: "object",
                        properties: {
                          rampUpRules: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                actionHostName: {
                                  type: "string",
                                },
                                reroutePercentage: {
                                  type: "number",
                                },
                                changeStep: {
                                  type: "number",
                                },
                                changeIntervalInMinutes: {
                                  type: "number",
                                },
                                minReroutePercentage: {
                                  type: "number",
                                },
                                maxReroutePercentage: {
                                  type: "number",
                                },
                                changeDecisionCallbackUrl: {
                                  type: "string",
                                },
                                name: {
                                  type: "string",
                                },
                              },
                            },
                          },
                        },
                      },
                      limits: {
                        type: "object",
                        properties: {
                          maxPercentageCpu: {
                            type: "number",
                          },
                          maxMemoryInMb: {
                            type: "number",
                          },
                          maxDiskSizeInMb: {
                            type: "number",
                          },
                        },
                      },
                      autoHealEnabled: {
                        type: "boolean",
                      },
                      autoHealRules: {
                        type: "object",
                        properties: {
                          triggers: {
                            type: "object",
                            properties: {
                              requests: {
                                type: "object",
                                properties: {
                                  count: {
                                    type: "number",
                                  },
                                  timeInterval: {
                                    type: "string",
                                  },
                                },
                              },
                              privateBytesInKB: {
                                type: "number",
                              },
                              statusCodes: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    status: {
                                      type: "number",
                                    },
                                    subStatus: {
                                      type: "number",
                                    },
                                    win32Status: {
                                      type: "number",
                                    },
                                    count: {
                                      type: "number",
                                    },
                                    timeInterval: {
                                      type: "string",
                                    },
                                    path: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                              slowRequests: {
                                type: "object",
                                properties: {
                                  timeTaken: {
                                    type: "string",
                                  },
                                  path: {
                                    type: "string",
                                  },
                                  count: {
                                    type: "number",
                                  },
                                  timeInterval: {
                                    type: "string",
                                  },
                                },
                              },
                              slowRequestsWithPath: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    timeTaken: {
                                      type: "object",
                                      additionalProperties: true,
                                    },
                                    path: {
                                      type: "object",
                                      additionalProperties: true,
                                    },
                                    count: {
                                      type: "object",
                                      additionalProperties: true,
                                    },
                                    timeInterval: {
                                      type: "object",
                                      additionalProperties: true,
                                    },
                                  },
                                },
                              },
                              statusCodesRange: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    statusCodes: {
                                      type: "string",
                                    },
                                    path: {
                                      type: "string",
                                    },
                                    count: {
                                      type: "number",
                                    },
                                    timeInterval: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                            },
                          },
                          actions: {
                            type: "object",
                            properties: {
                              actionType: {
                                type: "string",
                              },
                              customAction: {
                                type: "object",
                                properties: {
                                  exe: {
                                    type: "string",
                                  },
                                  parameters: {
                                    type: "string",
                                  },
                                },
                              },
                              minProcessExecutionTime: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                      tracingOptions: {
                        type: "string",
                      },
                      vnetName: {
                        type: "string",
                      },
                      vnetRouteAllEnabled: {
                        type: "boolean",
                      },
                      vnetPrivatePortsCount: {
                        type: "number",
                      },
                      cors: {
                        type: "object",
                        properties: {
                          allowedOrigins: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          supportCredentials: {
                            type: "boolean",
                          },
                        },
                      },
                      push: {
                        type: "object",
                        properties: {
                          properties: {
                            type: "object",
                            properties: {
                              isPushEnabled: {
                                type: "boolean",
                              },
                              tagWhitelistJson: {
                                type: "string",
                              },
                              tagsRequiringAuth: {
                                type: "string",
                              },
                              dynamicTagsJson: {
                                type: "string",
                              },
                            },
                            required: ["isPushEnabled"],
                          },
                        },
                      },
                      apiDefinition: {
                        type: "object",
                        properties: {
                          url: {
                            type: "string",
                          },
                        },
                      },
                      apiManagementConfig: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                        },
                      },
                      autoSwapSlotName: {
                        type: "string",
                      },
                      localMySqlEnabled: {
                        type: "boolean",
                      },
                      managedServiceIdentityId: {
                        type: "number",
                      },
                      xManagedServiceIdentityId: {
                        type: "number",
                      },
                      keyVaultReferenceIdentity: {
                        type: "string",
                      },
                      ipSecurityRestrictions: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            ipAddress: {
                              type: "string",
                            },
                            subnetMask: {
                              type: "string",
                            },
                            vnetSubnetResourceId: {
                              type: "string",
                            },
                            vnetTrafficTag: {
                              type: "number",
                            },
                            subnetTrafficTag: {
                              type: "number",
                            },
                            action: {
                              type: "string",
                            },
                            tag: {
                              type: "string",
                            },
                            priority: {
                              type: "number",
                            },
                            name: {
                              type: "string",
                            },
                            description: {
                              type: "string",
                            },
                            headers: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                      },
                      ipSecurityRestrictionsDefaultAction: {
                        type: "string",
                      },
                      scmIpSecurityRestrictions: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                      scmIpSecurityRestrictionsDefaultAction: {
                        type: "string",
                      },
                      scmIpSecurityRestrictionsUseMain: {
                        type: "boolean",
                      },
                      http20Enabled: {
                        type: "boolean",
                      },
                      http20ProxyFlag: {
                        type: "number",
                      },
                      minTlsVersion: {
                        type: "string",
                      },
                      minTlsCipherSuite: {
                        type: "string",
                      },
                      scmMinTlsVersion: {
                        type: "string",
                      },
                      ftpsState: {
                        type: "string",
                      },
                      preWarmedInstanceCount: {
                        type: "number",
                      },
                      functionAppScaleLimit: {
                        type: "number",
                      },
                      elasticWebAppScaleLimit: {
                        type: "number",
                      },
                      healthCheckPath: {
                        type: "string",
                      },
                      functionsRuntimeScaleMonitoringEnabled: {
                        type: "boolean",
                      },
                      websiteTimeZone: {
                        type: "string",
                      },
                      minimumElasticInstanceCount: {
                        type: "number",
                      },
                      azureStorageAccounts: {
                        type: "object",
                        additionalProperties: true,
                      },
                      publicNetworkAccess: {
                        type: "string",
                      },
                    },
                  },
                  trafficManagerHostNames: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  scmSiteAlsoStopped: {
                    type: "boolean",
                  },
                  targetSwapSlot: {
                    type: "string",
                  },
                  hostingEnvironmentProfile: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                      type: {
                        type: "string",
                      },
                    },
                  },
                  clientAffinityEnabled: {
                    type: "boolean",
                  },
                  clientAffinityProxyEnabled: {
                    type: "boolean",
                  },
                  clientCertEnabled: {
                    type: "boolean",
                  },
                  clientCertMode: {
                    type: "string",
                  },
                  clientCertExclusionPaths: {
                    type: "string",
                  },
                  hostNamesDisabled: {
                    type: "boolean",
                  },
                  customDomainVerificationId: {
                    type: "string",
                  },
                  outboundIpAddresses: {
                    type: "string",
                  },
                  possibleOutboundIpAddresses: {
                    type: "string",
                  },
                  containerSize: {
                    type: "number",
                  },
                  dailyMemoryTimeQuota: {
                    type: "number",
                  },
                  suspendedTill: {
                    type: "string",
                  },
                  maxNumberOfWorkers: {
                    type: "number",
                  },
                  cloningInfo: {
                    type: "object",
                    properties: {
                      correlationId: {
                        type: "string",
                      },
                      overwrite: {
                        type: "boolean",
                      },
                      cloneCustomHostNames: {
                        type: "boolean",
                      },
                      cloneSourceControl: {
                        type: "boolean",
                      },
                      sourceWebAppId: {
                        type: "string",
                      },
                      sourceWebAppLocation: {
                        type: "string",
                      },
                      hostingEnvironment: {
                        type: "string",
                      },
                      appSettingsOverrides: {
                        type: "object",
                        additionalProperties: true,
                      },
                      configureLoadBalancing: {
                        type: "boolean",
                      },
                      trafficManagerProfileId: {
                        type: "string",
                      },
                      trafficManagerProfileName: {
                        type: "string",
                      },
                    },
                    required: ["sourceWebAppId"],
                  },
                  resourceGroup: {
                    type: "string",
                  },
                  isDefaultContainer: {
                    type: "boolean",
                  },
                  defaultHostName: {
                    type: "string",
                  },
                  slotSwapStatus: {
                    type: "object",
                    properties: {
                      timestampUtc: {
                        type: "string",
                      },
                      sourceSlotName: {
                        type: "string",
                      },
                      destinationSlotName: {
                        type: "string",
                      },
                    },
                  },
                  httpsOnly: {
                    type: "boolean",
                  },
                  redundancyMode: {
                    type: "string",
                  },
                  inProgressOperationId: {
                    type: "string",
                  },
                  storageAccountRequired: {
                    type: "boolean",
                  },
                  keyVaultReferenceIdentity: {
                    type: "string",
                  },
                  virtualNetworkSubnetId: {
                    type: "string",
                  },
                },
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
                  principalId: {
                    type: "string",
                  },
                  userAssignedIdentities: {
                    type: "object",
                    additionalProperties: true,
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
        const requestBody = input.event.inputConfig.siteEnvelope;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}` +
          "?api-version=2024-11-01";

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
          properties: {
            type: "object",
            properties: {
              state: {
                type: "string",
              },
              hostNames: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              repositorySiteName: {
                type: "string",
              },
              usageState: {
                type: "string",
              },
              enabled: {
                type: "boolean",
              },
              enabledHostNames: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              availabilityState: {
                type: "string",
              },
              hostNameSslStates: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    sslState: {
                      type: "string",
                    },
                    virtualIP: {
                      type: "string",
                    },
                    thumbprint: {
                      type: "string",
                    },
                    toUpdate: {
                      type: "boolean",
                    },
                    hostType: {
                      type: "string",
                    },
                  },
                },
              },
              serverFarmId: {
                type: "string",
              },
              reserved: {
                type: "boolean",
              },
              isXenon: {
                type: "boolean",
              },
              hyperV: {
                type: "boolean",
              },
              lastModifiedTimeUtc: {
                type: "string",
              },
              dnsConfiguration: {
                type: "object",
                properties: {
                  dnsServers: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  dnsAltServer: {
                    type: "string",
                  },
                  dnsRetryAttemptTimeout: {
                    type: "integer",
                  },
                  dnsRetryAttemptCount: {
                    type: "integer",
                  },
                  dnsMaxCacheTimeout: {
                    type: "integer",
                  },
                  dnsLegacySortOrder: {
                    type: "boolean",
                  },
                },
              },
              outboundVnetRouting: {
                type: "object",
                properties: {
                  allTraffic: {
                    type: "boolean",
                  },
                  applicationTraffic: {
                    type: "boolean",
                  },
                  contentShareTraffic: {
                    type: "boolean",
                  },
                  imagePullTraffic: {
                    type: "boolean",
                  },
                  backupRestoreTraffic: {
                    type: "boolean",
                  },
                },
              },
              siteConfig: {
                type: "object",
                properties: {
                  numberOfWorkers: {
                    type: "integer",
                  },
                  defaultDocuments: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  netFrameworkVersion: {
                    type: "string",
                  },
                  phpVersion: {
                    type: "string",
                  },
                  pythonVersion: {
                    type: "string",
                  },
                  nodeVersion: {
                    type: "string",
                  },
                  powerShellVersion: {
                    type: "string",
                  },
                  linuxFxVersion: {
                    type: "string",
                  },
                  windowsFxVersion: {
                    type: "string",
                  },
                  requestTracingEnabled: {
                    type: "boolean",
                  },
                  requestTracingExpirationTime: {
                    type: "string",
                  },
                  remoteDebuggingEnabled: {
                    type: "boolean",
                  },
                  remoteDebuggingVersion: {
                    type: "string",
                  },
                  httpLoggingEnabled: {
                    type: "boolean",
                  },
                  acrUseManagedIdentityCreds: {
                    type: "boolean",
                  },
                  acrUserManagedIdentityID: {
                    type: "string",
                  },
                  logsDirectorySizeLimit: {
                    type: "integer",
                  },
                  detailedErrorLoggingEnabled: {
                    type: "boolean",
                  },
                  publishingUsername: {
                    type: "string",
                  },
                  appSettings: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        value: {
                          type: "string",
                        },
                      },
                    },
                  },
                  metadata: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  connectionStrings: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        connectionString: {
                          type: "string",
                        },
                        type: {
                          type: "string",
                        },
                      },
                    },
                  },
                  machineKey: {
                    type: "object",
                    properties: {
                      validation: {
                        type: "string",
                      },
                      validationKey: {
                        type: "string",
                      },
                      decryption: {
                        type: "string",
                      },
                      decryptionKey: {
                        type: "string",
                      },
                    },
                  },
                  handlerMappings: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        extension: {
                          type: "string",
                        },
                        scriptProcessor: {
                          type: "string",
                        },
                        arguments: {
                          type: "string",
                        },
                      },
                    },
                  },
                  documentRoot: {
                    type: "string",
                  },
                  scmType: {
                    type: "string",
                  },
                  use32BitWorkerProcess: {
                    type: "boolean",
                  },
                  webSocketsEnabled: {
                    type: "boolean",
                  },
                  alwaysOn: {
                    type: "boolean",
                  },
                  javaVersion: {
                    type: "string",
                  },
                  javaContainer: {
                    type: "string",
                  },
                  javaContainerVersion: {
                    type: "string",
                  },
                  appCommandLine: {
                    type: "string",
                  },
                  managedPipelineMode: {
                    type: "string",
                  },
                  virtualApplications: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        virtualPath: {
                          type: "string",
                        },
                        physicalPath: {
                          type: "string",
                        },
                        preloadEnabled: {
                          type: "boolean",
                        },
                        virtualDirectories: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              virtualPath: {
                                type: "string",
                              },
                              physicalPath: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  loadBalancing: {
                    type: "string",
                  },
                  experiments: {
                    type: "object",
                    properties: {
                      rampUpRules: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            actionHostName: {
                              type: "string",
                            },
                            reroutePercentage: {
                              type: "number",
                            },
                            changeStep: {
                              type: "number",
                            },
                            changeIntervalInMinutes: {
                              type: "integer",
                            },
                            minReroutePercentage: {
                              type: "number",
                            },
                            maxReroutePercentage: {
                              type: "number",
                            },
                            changeDecisionCallbackUrl: {
                              type: "string",
                            },
                            name: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                  limits: {
                    type: "object",
                    properties: {
                      maxPercentageCpu: {
                        type: "number",
                      },
                      maxMemoryInMb: {
                        type: "integer",
                      },
                      maxDiskSizeInMb: {
                        type: "integer",
                      },
                    },
                  },
                  autoHealEnabled: {
                    type: "boolean",
                  },
                  autoHealRules: {
                    type: "object",
                    properties: {
                      triggers: {
                        type: "object",
                        properties: {
                          requests: {
                            type: "object",
                            properties: {
                              count: {
                                type: "integer",
                              },
                              timeInterval: {
                                type: "string",
                              },
                            },
                          },
                          privateBytesInKB: {
                            type: "integer",
                          },
                          statusCodes: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                status: {
                                  type: "integer",
                                },
                                subStatus: {
                                  type: "integer",
                                },
                                win32Status: {
                                  type: "integer",
                                },
                                count: {
                                  type: "integer",
                                },
                                timeInterval: {
                                  type: "string",
                                },
                                path: {
                                  type: "string",
                                },
                              },
                            },
                          },
                          slowRequests: {
                            type: "object",
                            properties: {
                              timeTaken: {
                                type: "string",
                              },
                              path: {
                                type: "string",
                              },
                              count: {
                                type: "integer",
                              },
                              timeInterval: {
                                type: "string",
                              },
                            },
                          },
                          slowRequestsWithPath: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                timeTaken: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                path: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                count: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                timeInterval: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                            },
                          },
                          statusCodesRange: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                statusCodes: {
                                  type: "string",
                                },
                                path: {
                                  type: "string",
                                },
                                count: {
                                  type: "integer",
                                },
                                timeInterval: {
                                  type: "string",
                                },
                              },
                            },
                          },
                        },
                      },
                      actions: {
                        type: "object",
                        properties: {
                          actionType: {
                            type: "string",
                          },
                          customAction: {
                            type: "object",
                            properties: {
                              exe: {
                                type: "string",
                              },
                              parameters: {
                                type: "string",
                              },
                            },
                          },
                          minProcessExecutionTime: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                  tracingOptions: {
                    type: "string",
                  },
                  vnetName: {
                    type: "string",
                  },
                  vnetRouteAllEnabled: {
                    type: "boolean",
                  },
                  vnetPrivatePortsCount: {
                    type: "integer",
                  },
                  cors: {
                    type: "object",
                    properties: {
                      allowedOrigins: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      supportCredentials: {
                        type: "boolean",
                      },
                    },
                  },
                  push: {
                    type: "object",
                    properties: {
                      properties: {
                        type: "object",
                        properties: {
                          isPushEnabled: {
                            type: "boolean",
                          },
                          tagWhitelistJson: {
                            type: "string",
                          },
                          tagsRequiringAuth: {
                            type: "string",
                          },
                          dynamicTagsJson: {
                            type: "string",
                          },
                        },
                        required: ["isPushEnabled"],
                      },
                    },
                  },
                  apiDefinition: {
                    type: "object",
                    properties: {
                      url: {
                        type: "string",
                      },
                    },
                  },
                  apiManagementConfig: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                    },
                  },
                  autoSwapSlotName: {
                    type: "string",
                  },
                  localMySqlEnabled: {
                    type: "boolean",
                  },
                  managedServiceIdentityId: {
                    type: "integer",
                  },
                  xManagedServiceIdentityId: {
                    type: "integer",
                  },
                  keyVaultReferenceIdentity: {
                    type: "string",
                  },
                  ipSecurityRestrictions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        ipAddress: {
                          type: "string",
                        },
                        subnetMask: {
                          type: "string",
                        },
                        vnetSubnetResourceId: {
                          type: "string",
                        },
                        vnetTrafficTag: {
                          type: "integer",
                        },
                        subnetTrafficTag: {
                          type: "integer",
                        },
                        action: {
                          type: "string",
                        },
                        tag: {
                          type: "string",
                        },
                        priority: {
                          type: "integer",
                        },
                        name: {
                          type: "string",
                        },
                        description: {
                          type: "string",
                        },
                        headers: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                  },
                  ipSecurityRestrictionsDefaultAction: {
                    type: "string",
                  },
                  scmIpSecurityRestrictions: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  scmIpSecurityRestrictionsDefaultAction: {
                    type: "string",
                  },
                  scmIpSecurityRestrictionsUseMain: {
                    type: "boolean",
                  },
                  http20Enabled: {
                    type: "boolean",
                  },
                  http20ProxyFlag: {
                    type: "integer",
                  },
                  minTlsVersion: {
                    type: "string",
                  },
                  minTlsCipherSuite: {
                    type: "string",
                  },
                  scmMinTlsVersion: {
                    type: "string",
                  },
                  ftpsState: {
                    type: "string",
                  },
                  preWarmedInstanceCount: {
                    type: "integer",
                  },
                  functionAppScaleLimit: {
                    type: "integer",
                  },
                  elasticWebAppScaleLimit: {
                    type: "integer",
                  },
                  healthCheckPath: {
                    type: "string",
                  },
                  functionsRuntimeScaleMonitoringEnabled: {
                    type: "boolean",
                  },
                  websiteTimeZone: {
                    type: "string",
                  },
                  minimumElasticInstanceCount: {
                    type: "integer",
                  },
                  azureStorageAccounts: {
                    type: "object",
                    additionalProperties: true,
                  },
                  publicNetworkAccess: {
                    type: "string",
                  },
                },
              },
              functionAppConfig: {
                type: "object",
                properties: {
                  deployment: {
                    type: "object",
                    properties: {
                      storage: {
                        type: "object",
                        properties: {
                          type: {
                            type: "string",
                          },
                          value: {
                            type: "string",
                          },
                          authentication: {
                            type: "object",
                            properties: {
                              type: {
                                type: "string",
                              },
                              userAssignedIdentityResourceId: {
                                type: "string",
                              },
                              storageAccountConnectionStringName: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  runtime: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      version: {
                        type: "string",
                      },
                    },
                  },
                  scaleAndConcurrency: {
                    type: "object",
                    properties: {
                      alwaysReady: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            instanceCount: {
                              type: "integer",
                            },
                          },
                        },
                      },
                      maximumInstanceCount: {
                        type: "integer",
                      },
                      instanceMemoryMB: {
                        type: "integer",
                      },
                      triggers: {
                        type: "object",
                        properties: {
                          http: {
                            type: "object",
                            properties: {
                              perInstanceConcurrency: {
                                type: "integer",
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              daprConfig: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  appId: {
                    type: "string",
                  },
                  appPort: {
                    type: "integer",
                  },
                  httpReadBufferSize: {
                    type: "integer",
                  },
                  httpMaxRequestSize: {
                    type: "integer",
                  },
                  logLevel: {
                    type: "string",
                  },
                  enableApiLogging: {
                    type: "boolean",
                  },
                },
              },
              workloadProfileName: {
                type: "string",
              },
              resourceConfig: {
                type: "object",
                properties: {
                  cpu: {
                    type: "number",
                  },
                  memory: {
                    type: "string",
                  },
                },
              },
              trafficManagerHostNames: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              scmSiteAlsoStopped: {
                type: "boolean",
              },
              targetSwapSlot: {
                type: "string",
              },
              hostingEnvironmentProfile: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                },
              },
              clientAffinityEnabled: {
                type: "boolean",
              },
              clientAffinityPartitioningEnabled: {
                type: "boolean",
              },
              clientAffinityProxyEnabled: {
                type: "boolean",
              },
              clientCertEnabled: {
                type: "boolean",
              },
              clientCertMode: {
                type: "string",
              },
              clientCertExclusionPaths: {
                type: "string",
              },
              ipMode: {
                type: "string",
              },
              endToEndEncryptionEnabled: {
                type: "boolean",
              },
              sshEnabled: {
                type: "boolean",
              },
              hostNamesDisabled: {
                type: "boolean",
              },
              customDomainVerificationId: {
                type: "string",
              },
              outboundIpAddresses: {
                type: "string",
              },
              possibleOutboundIpAddresses: {
                type: "string",
              },
              containerSize: {
                type: "integer",
              },
              dailyMemoryTimeQuota: {
                type: "integer",
              },
              suspendedTill: {
                type: "string",
              },
              maxNumberOfWorkers: {
                type: "integer",
              },
              cloningInfo: {
                type: "object",
                properties: {
                  correlationId: {
                    type: "string",
                  },
                  overwrite: {
                    type: "boolean",
                  },
                  cloneCustomHostNames: {
                    type: "boolean",
                  },
                  cloneSourceControl: {
                    type: "boolean",
                  },
                  sourceWebAppId: {
                    type: "string",
                  },
                  sourceWebAppLocation: {
                    type: "string",
                  },
                  hostingEnvironment: {
                    type: "string",
                  },
                  appSettingsOverrides: {
                    type: "object",
                    additionalProperties: true,
                  },
                  configureLoadBalancing: {
                    type: "boolean",
                  },
                  trafficManagerProfileId: {
                    type: "string",
                  },
                  trafficManagerProfileName: {
                    type: "string",
                  },
                },
                required: ["sourceWebAppId"],
              },
              resourceGroup: {
                type: "string",
              },
              isDefaultContainer: {
                type: "boolean",
              },
              defaultHostName: {
                type: "string",
              },
              slotSwapStatus: {
                type: "object",
                properties: {
                  timestampUtc: {
                    type: "string",
                  },
                  sourceSlotName: {
                    type: "string",
                  },
                  destinationSlotName: {
                    type: "string",
                  },
                },
              },
              httpsOnly: {
                type: "boolean",
              },
              redundancyMode: {
                type: "string",
              },
              inProgressOperationId: {
                type: "string",
              },
              publicNetworkAccess: {
                type: "string",
              },
              storageAccountRequired: {
                type: "boolean",
              },
              keyVaultReferenceIdentity: {
                type: "string",
              },
              autoGeneratedDomainNameLabelScope: {
                type: "string",
              },
              virtualNetworkSubnetId: {
                type: "string",
              },
              managedEnvironmentId: {
                type: "string",
              },
              sku: {
                type: "string",
              },
            },
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
              principalId: {
                type: "string",
              },
              userAssignedIdentities: {
                type: "object",
                additionalProperties: true,
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

export default WebApps_UpdateSlot;
