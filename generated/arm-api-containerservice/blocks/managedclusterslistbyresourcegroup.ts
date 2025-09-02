import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedClusters_ListByResourceGroup: AppBlock = {
  name: "Managed Clusters / List By Resource Group",
  description:
    "Lists managed clusters in the specified subscription and resource group.",
  category: "Managed Clusters",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/managedClusters` +
          "?api-version=2025-07-01";

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
                eTag: {
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
                    delegatedResources: {
                      type: "object",
                      additionalProperties: true,
                    },
                    userAssignedIdentities: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
                properties: {
                  type: "object",
                  properties: {
                    provisioningState: {
                      type: "string",
                    },
                    powerState: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                        },
                      },
                    },
                    maxAgentPools: {
                      type: "integer",
                    },
                    kubernetesVersion: {
                      type: "string",
                    },
                    currentKubernetesVersion: {
                      type: "string",
                    },
                    dnsPrefix: {
                      type: "string",
                    },
                    fqdnSubdomain: {
                      type: "string",
                    },
                    fqdn: {
                      type: "string",
                    },
                    privateFQDN: {
                      type: "string",
                    },
                    azurePortalFQDN: {
                      type: "string",
                    },
                    agentPoolProfiles: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                        },
                        required: ["name"],
                      },
                    },
                    linuxProfile: {
                      type: "object",
                      properties: {
                        adminUsername: {
                          type: "string",
                        },
                        ssh: {
                          type: "object",
                          properties: {
                            publicKeys: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  keyData: {
                                    type: "string",
                                  },
                                },
                                required: ["keyData"],
                              },
                            },
                          },
                          required: ["publicKeys"],
                        },
                      },
                      required: ["adminUsername", "ssh"],
                    },
                    windowsProfile: {
                      type: "object",
                      properties: {
                        adminUsername: {
                          type: "string",
                        },
                        adminPassword: {
                          type: "string",
                        },
                        licenseType: {
                          type: "string",
                        },
                        enableCSIProxy: {
                          type: "boolean",
                        },
                        gmsaProfile: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                            dnsServer: {
                              type: "string",
                            },
                            rootDomainName: {
                              type: "string",
                            },
                          },
                        },
                      },
                      required: ["adminUsername"],
                    },
                    servicePrincipalProfile: {
                      type: "object",
                      properties: {
                        clientId: {
                          type: "string",
                        },
                        secret: {
                          type: "string",
                        },
                      },
                      required: ["clientId"],
                    },
                    addonProfiles: {
                      type: "object",
                      additionalProperties: true,
                    },
                    podIdentityProfile: {
                      type: "object",
                      properties: {
                        enabled: {
                          type: "boolean",
                        },
                        allowNetworkPluginKubenet: {
                          type: "boolean",
                        },
                        userAssignedIdentities: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                              },
                              namespace: {
                                type: "string",
                              },
                              bindingSelector: {
                                type: "string",
                              },
                              identity: {
                                type: "object",
                                properties: {
                                  resourceId: {
                                    type: "string",
                                  },
                                  clientId: {
                                    type: "string",
                                  },
                                  objectId: {
                                    type: "string",
                                  },
                                },
                              },
                              provisioningState: {
                                type: "string",
                              },
                              provisioningInfo: {
                                type: "object",
                                properties: {
                                  error: {
                                    type: "object",
                                    properties: {
                                      error: {
                                        type: "object",
                                        properties: {
                                          code: {
                                            type: "string",
                                          },
                                          message: {
                                            type: "string",
                                          },
                                          target: {
                                            type: "string",
                                          },
                                          details: {
                                            type: "array",
                                            items: {
                                              type: "object",
                                              properties: {
                                                code: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                                message: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                                target: {
                                                  type: "object",
                                                  additionalProperties: true,
                                                },
                                                details: {
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
                            required: ["name", "namespace", "identity"],
                          },
                        },
                        userAssignedIdentityExceptions: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                              },
                              namespace: {
                                type: "string",
                              },
                              podLabels: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                            required: ["name", "namespace", "podLabels"],
                          },
                        },
                      },
                    },
                    oidcIssuerProfile: {
                      type: "object",
                      properties: {
                        issuerURL: {
                          type: "string",
                        },
                        enabled: {
                          type: "boolean",
                        },
                      },
                    },
                    nodeResourceGroup: {
                      type: "string",
                    },
                    nodeResourceGroupProfile: {
                      type: "object",
                      properties: {
                        restrictionLevel: {
                          type: "string",
                        },
                      },
                    },
                    enableRBAC: {
                      type: "boolean",
                    },
                    supportPlan: {
                      type: "string",
                    },
                    networkProfile: {
                      type: "object",
                      properties: {
                        networkPlugin: {
                          type: "string",
                        },
                        networkPluginMode: {
                          type: "string",
                        },
                        networkPolicy: {
                          type: "string",
                        },
                        networkMode: {
                          type: "string",
                        },
                        networkDataplane: {
                          type: "string",
                        },
                        advancedNetworking: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                            observability: {
                              type: "object",
                              properties: {
                                enabled: {
                                  type: "boolean",
                                },
                              },
                            },
                            security: {
                              type: "object",
                              properties: {
                                enabled: {
                                  type: "boolean",
                                },
                              },
                            },
                          },
                        },
                        podCidr: {
                          type: "string",
                        },
                        serviceCidr: {
                          type: "string",
                        },
                        dnsServiceIP: {
                          type: "string",
                        },
                        outboundType: {
                          type: "string",
                        },
                        loadBalancerSku: {
                          type: "string",
                        },
                        loadBalancerProfile: {
                          type: "object",
                          properties: {
                            managedOutboundIPs: {
                              type: "object",
                              properties: {
                                count: {
                                  type: "integer",
                                },
                                countIPv6: {
                                  type: "integer",
                                },
                              },
                            },
                            outboundIPPrefixes: {
                              type: "object",
                              properties: {
                                publicIPPrefixes: {
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
                              },
                            },
                            outboundIPs: {
                              type: "object",
                              properties: {
                                publicIPs: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                },
                              },
                            },
                            effectiveOutboundIPs: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                            allocatedOutboundPorts: {
                              type: "integer",
                            },
                            idleTimeoutInMinutes: {
                              type: "integer",
                            },
                            enableMultipleStandardLoadBalancers: {
                              type: "boolean",
                            },
                            backendPoolType: {
                              type: "string",
                            },
                          },
                        },
                        natGatewayProfile: {
                          type: "object",
                          properties: {
                            managedOutboundIPProfile: {
                              type: "object",
                              properties: {
                                count: {
                                  type: "integer",
                                },
                              },
                            },
                            effectiveOutboundIPs: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                            idleTimeoutInMinutes: {
                              type: "integer",
                            },
                          },
                        },
                        staticEgressGatewayProfile: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                          },
                        },
                        podCidrs: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        serviceCidrs: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        ipFamilies: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                      },
                    },
                    aadProfile: {
                      type: "object",
                      properties: {
                        managed: {
                          type: "boolean",
                        },
                        enableAzureRBAC: {
                          type: "boolean",
                        },
                        adminGroupObjectIDs: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        clientAppID: {
                          type: "string",
                        },
                        serverAppID: {
                          type: "string",
                        },
                        serverAppSecret: {
                          type: "string",
                        },
                        tenantID: {
                          type: "string",
                        },
                      },
                    },
                    autoUpgradeProfile: {
                      type: "object",
                      properties: {
                        upgradeChannel: {
                          type: "string",
                        },
                        nodeOSUpgradeChannel: {
                          type: "string",
                        },
                      },
                    },
                    upgradeSettings: {
                      type: "object",
                      properties: {
                        overrideSettings: {
                          type: "object",
                          properties: {
                            forceUpgrade: {
                              type: "boolean",
                            },
                            until: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                    autoScalerProfile: {
                      type: "object",
                      properties: {
                        "balance-similar-node-groups": {
                          type: "string",
                        },
                        "daemonset-eviction-for-empty-nodes": {
                          type: "boolean",
                        },
                        "daemonset-eviction-for-occupied-nodes": {
                          type: "boolean",
                        },
                        "ignore-daemonsets-utilization": {
                          type: "boolean",
                        },
                        expander: {
                          type: "string",
                        },
                        "max-empty-bulk-delete": {
                          type: "string",
                        },
                        "max-graceful-termination-sec": {
                          type: "string",
                        },
                        "max-node-provision-time": {
                          type: "string",
                        },
                        "max-total-unready-percentage": {
                          type: "string",
                        },
                        "new-pod-scale-up-delay": {
                          type: "string",
                        },
                        "ok-total-unready-count": {
                          type: "string",
                        },
                        "scan-interval": {
                          type: "string",
                        },
                        "scale-down-delay-after-add": {
                          type: "string",
                        },
                        "scale-down-delay-after-delete": {
                          type: "string",
                        },
                        "scale-down-delay-after-failure": {
                          type: "string",
                        },
                        "scale-down-unneeded-time": {
                          type: "string",
                        },
                        "scale-down-unready-time": {
                          type: "string",
                        },
                        "scale-down-utilization-threshold": {
                          type: "string",
                        },
                        "skip-nodes-with-local-storage": {
                          type: "string",
                        },
                        "skip-nodes-with-system-pods": {
                          type: "string",
                        },
                      },
                    },
                    apiServerAccessProfile: {
                      type: "object",
                      properties: {
                        authorizedIPRanges: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        enablePrivateCluster: {
                          type: "boolean",
                        },
                        privateDNSZone: {
                          type: "string",
                        },
                        enablePrivateClusterPublicFQDN: {
                          type: "boolean",
                        },
                        disableRunCommand: {
                          type: "boolean",
                        },
                        enableVnetIntegration: {
                          type: "boolean",
                        },
                        subnetId: {
                          type: "string",
                        },
                      },
                    },
                    diskEncryptionSetID: {
                      type: "string",
                    },
                    identityProfile: {
                      type: "object",
                      additionalProperties: true,
                    },
                    privateLinkResources: {
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
                          type: {
                            type: "string",
                          },
                          groupId: {
                            type: "string",
                          },
                          requiredMembers: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          privateLinkServiceID: {
                            type: "string",
                          },
                        },
                      },
                    },
                    disableLocalAccounts: {
                      type: "boolean",
                    },
                    httpProxyConfig: {
                      type: "object",
                      properties: {
                        httpProxy: {
                          type: "string",
                        },
                        httpsProxy: {
                          type: "string",
                        },
                        noProxy: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        trustedCa: {
                          type: "string",
                        },
                      },
                    },
                    securityProfile: {
                      type: "object",
                      properties: {
                        defender: {
                          type: "object",
                          properties: {
                            logAnalyticsWorkspaceResourceId: {
                              type: "string",
                            },
                            securityMonitoring: {
                              type: "object",
                              properties: {
                                enabled: {
                                  type: "boolean",
                                },
                              },
                            },
                          },
                        },
                        azureKeyVaultKms: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                            keyId: {
                              type: "string",
                            },
                            keyVaultNetworkAccess: {
                              type: "string",
                            },
                            keyVaultResourceId: {
                              type: "string",
                            },
                          },
                        },
                        workloadIdentity: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                          },
                        },
                        imageCleaner: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                            intervalHours: {
                              type: "integer",
                            },
                          },
                        },
                        customCATrustCertificates: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                      },
                    },
                    storageProfile: {
                      type: "object",
                      properties: {
                        diskCSIDriver: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                          },
                        },
                        fileCSIDriver: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                          },
                        },
                        snapshotController: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                          },
                        },
                        blobCSIDriver: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                          },
                        },
                      },
                    },
                    ingressProfile: {
                      type: "object",
                      properties: {
                        webAppRouting: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                            dnsZoneResourceIds: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            nginx: {
                              type: "object",
                              properties: {
                                defaultIngressControllerType: {
                                  type: "string",
                                },
                              },
                            },
                            identity: {
                              type: "object",
                              properties: {
                                resourceId: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                clientId: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                objectId: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    publicNetworkAccess: {
                      type: "string",
                    },
                    workloadAutoScalerProfile: {
                      type: "object",
                      properties: {
                        keda: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                          },
                          required: ["enabled"],
                        },
                        verticalPodAutoscaler: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                          },
                          required: ["enabled"],
                        },
                      },
                    },
                    azureMonitorProfile: {
                      type: "object",
                      properties: {
                        metrics: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                            kubeStateMetrics: {
                              type: "object",
                              properties: {
                                metricLabelsAllowlist: {
                                  type: "string",
                                },
                                metricAnnotationsAllowList: {
                                  type: "string",
                                },
                              },
                            },
                          },
                          required: ["enabled"],
                        },
                      },
                    },
                    serviceMeshProfile: {
                      type: "object",
                      properties: {
                        mode: {
                          type: "string",
                        },
                        istio: {
                          type: "object",
                          properties: {
                            components: {
                              type: "object",
                              properties: {
                                ingressGateways: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    properties: {
                                      mode: {
                                        type: "string",
                                      },
                                      enabled: {
                                        type: "boolean",
                                      },
                                    },
                                    required: ["mode", "enabled"],
                                  },
                                },
                                egressGateways: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    properties: {
                                      enabled: {
                                        type: "boolean",
                                      },
                                    },
                                    required: ["enabled"],
                                  },
                                },
                              },
                            },
                            certificateAuthority: {
                              type: "object",
                              properties: {
                                plugin: {
                                  type: "object",
                                  properties: {
                                    keyVaultId: {
                                      type: "string",
                                    },
                                    certObjectName: {
                                      type: "string",
                                    },
                                    keyObjectName: {
                                      type: "string",
                                    },
                                    rootCertObjectName: {
                                      type: "string",
                                    },
                                    certChainObjectName: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                            },
                            revisions: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                      required: ["mode"],
                    },
                    resourceUID: {
                      type: "string",
                    },
                    metricsProfile: {
                      type: "object",
                      properties: {
                        costAnalysis: {
                          type: "object",
                          properties: {
                            enabled: {
                              type: "boolean",
                            },
                          },
                        },
                      },
                    },
                    nodeProvisioningProfile: {
                      type: "object",
                      properties: {
                        mode: {
                          type: "string",
                        },
                        defaultNodePools: {
                          type: "string",
                        },
                      },
                    },
                    bootstrapProfile: {
                      type: "object",
                      properties: {
                        artifactSource: {
                          type: "string",
                        },
                        containerRegistryId: {
                          type: "string",
                        },
                      },
                    },
                    aiToolchainOperatorProfile: {
                      type: "object",
                      properties: {
                        enabled: {
                          type: "boolean",
                        },
                      },
                    },
                    status: {
                      type: "object",
                      properties: {
                        provisioningError: {
                          type: "object",
                          properties: {
                            code: {
                              type: "string",
                            },
                            message: {
                              type: "string",
                            },
                            target: {
                              type: "string",
                            },
                            details: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  code: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  message: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  target: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  details: {
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
                kind: {
                  type: "string",
                },
              },
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

export default ManagedClusters_ListByResourceGroup;
