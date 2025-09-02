import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_UpdateConfigurationSlot: AppBlock = {
  name: "Web Apps / Update Configuration Slot",
  description: "Description for Updates the configuration of an app.",
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
        siteConfig: {
          name: "Site Config",
          description:
            "JSON representation of a SiteConfig object. See example.",
          type: {
            type: "object",
            properties: {
              properties: {
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
        const requestBody = input.event.inputConfig.siteConfig;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/config/web` +
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
        },
      },
    },
  },
};

export default WebApps_UpdateConfigurationSlot;
