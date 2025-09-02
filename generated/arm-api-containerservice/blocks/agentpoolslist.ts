import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AgentPools_List: AppBlock = {
  name: "Agent Pools / List",
  description: "Gets a list of agent pools in the specified managed cluster.",
  category: "Agent Pools",
  inputs: {
    default: {
      config: {
        resourceName: {
          name: "Resource Name",
          description: "Name of the resource",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/${input.event.inputConfig.resourceName}/agentPools` +
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
                properties: {
                  type: "object",
                  properties: {
                    eTag: {
                      type: "string",
                    },
                    count: {
                      type: "integer",
                    },
                    vmSize: {
                      type: "string",
                    },
                    osDiskSizeGB: {
                      type: "integer",
                    },
                    osDiskType: {
                      type: "string",
                    },
                    kubeletDiskType: {
                      type: "string",
                    },
                    workloadRuntime: {
                      type: "string",
                    },
                    messageOfTheDay: {
                      type: "string",
                    },
                    vnetSubnetID: {
                      type: "string",
                    },
                    podSubnetID: {
                      type: "string",
                    },
                    podIPAllocationMode: {
                      type: "string",
                    },
                    maxPods: {
                      type: "integer",
                    },
                    osType: {
                      type: "string",
                    },
                    osSKU: {
                      type: "string",
                    },
                    maxCount: {
                      type: "integer",
                    },
                    minCount: {
                      type: "integer",
                    },
                    enableAutoScaling: {
                      type: "boolean",
                    },
                    scaleDownMode: {
                      type: "string",
                    },
                    type: {
                      type: "string",
                    },
                    mode: {
                      type: "string",
                    },
                    orchestratorVersion: {
                      type: "string",
                    },
                    currentOrchestratorVersion: {
                      type: "string",
                    },
                    nodeImageVersion: {
                      type: "string",
                    },
                    upgradeSettings: {
                      type: "object",
                      properties: {
                        maxSurge: {
                          type: "string",
                        },
                        maxUnavailable: {
                          type: "string",
                        },
                        drainTimeoutInMinutes: {
                          type: "integer",
                        },
                        nodeSoakDurationInMinutes: {
                          type: "integer",
                        },
                        undrainableNodeBehavior: {
                          type: "string",
                        },
                      },
                    },
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
                    availabilityZones: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    enableNodePublicIP: {
                      type: "boolean",
                    },
                    nodePublicIPPrefixID: {
                      type: "string",
                    },
                    scaleSetPriority: {
                      type: "string",
                    },
                    scaleSetEvictionPolicy: {
                      type: "string",
                    },
                    spotMaxPrice: {
                      type: "number",
                    },
                    tags: {
                      type: "object",
                      additionalProperties: true,
                    },
                    nodeLabels: {
                      type: "object",
                      additionalProperties: true,
                    },
                    nodeTaints: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    proximityPlacementGroupID: {
                      type: "string",
                    },
                    kubeletConfig: {
                      type: "object",
                      properties: {
                        cpuManagerPolicy: {
                          type: "string",
                        },
                        cpuCfsQuota: {
                          type: "boolean",
                        },
                        cpuCfsQuotaPeriod: {
                          type: "string",
                        },
                        imageGcHighThreshold: {
                          type: "integer",
                        },
                        imageGcLowThreshold: {
                          type: "integer",
                        },
                        topologyManagerPolicy: {
                          type: "string",
                        },
                        allowedUnsafeSysctls: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        failSwapOn: {
                          type: "boolean",
                        },
                        containerLogMaxSizeMB: {
                          type: "integer",
                        },
                        containerLogMaxFiles: {
                          type: "integer",
                        },
                        podMaxPids: {
                          type: "integer",
                        },
                      },
                    },
                    linuxOSConfig: {
                      type: "object",
                      properties: {
                        sysctls: {
                          type: "object",
                          properties: {
                            netCoreSomaxconn: {
                              type: "integer",
                            },
                            netCoreNetdevMaxBacklog: {
                              type: "integer",
                            },
                            netCoreRmemDefault: {
                              type: "integer",
                            },
                            netCoreRmemMax: {
                              type: "integer",
                            },
                            netCoreWmemDefault: {
                              type: "integer",
                            },
                            netCoreWmemMax: {
                              type: "integer",
                            },
                            netCoreOptmemMax: {
                              type: "integer",
                            },
                            netIpv4TcpMaxSynBacklog: {
                              type: "integer",
                            },
                            netIpv4TcpMaxTwBuckets: {
                              type: "integer",
                            },
                            netIpv4TcpFinTimeout: {
                              type: "integer",
                            },
                            netIpv4TcpKeepaliveTime: {
                              type: "integer",
                            },
                            netIpv4TcpKeepaliveProbes: {
                              type: "integer",
                            },
                            netIpv4TcpkeepaliveIntvl: {
                              type: "integer",
                            },
                            netIpv4TcpTwReuse: {
                              type: "boolean",
                            },
                            netIpv4IpLocalPortRange: {
                              type: "string",
                            },
                            netIpv4NeighDefaultGcThresh1: {
                              type: "integer",
                            },
                            netIpv4NeighDefaultGcThresh2: {
                              type: "integer",
                            },
                            netIpv4NeighDefaultGcThresh3: {
                              type: "integer",
                            },
                            netNetfilterNfConntrackMax: {
                              type: "integer",
                            },
                            netNetfilterNfConntrackBuckets: {
                              type: "integer",
                            },
                            fsInotifyMaxUserWatches: {
                              type: "integer",
                            },
                            fsFileMax: {
                              type: "integer",
                            },
                            fsAioMaxNr: {
                              type: "integer",
                            },
                            fsNrOpen: {
                              type: "integer",
                            },
                            kernelThreadsMax: {
                              type: "integer",
                            },
                            vmMaxMapCount: {
                              type: "integer",
                            },
                            vmSwappiness: {
                              type: "integer",
                            },
                            vmVfsCachePressure: {
                              type: "integer",
                            },
                          },
                        },
                        transparentHugePageEnabled: {
                          type: "string",
                        },
                        transparentHugePageDefrag: {
                          type: "string",
                        },
                        swapFileSizeMB: {
                          type: "integer",
                        },
                      },
                    },
                    enableEncryptionAtHost: {
                      type: "boolean",
                    },
                    enableUltraSSD: {
                      type: "boolean",
                    },
                    enableFIPS: {
                      type: "boolean",
                    },
                    gpuInstanceProfile: {
                      type: "string",
                    },
                    creationData: {
                      type: "object",
                      properties: {
                        sourceResourceId: {
                          type: "string",
                        },
                      },
                    },
                    capacityReservationGroupID: {
                      type: "string",
                    },
                    hostGroupID: {
                      type: "string",
                    },
                    networkProfile: {
                      type: "object",
                      properties: {
                        nodePublicIPTags: {
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
                        allowedHostPorts: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              portStart: {
                                type: "integer",
                              },
                              portEnd: {
                                type: "integer",
                              },
                              protocol: {
                                type: "string",
                              },
                            },
                          },
                        },
                        applicationSecurityGroups: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                      },
                    },
                    windowsProfile: {
                      type: "object",
                      properties: {
                        disableOutboundNat: {
                          type: "boolean",
                        },
                      },
                    },
                    securityProfile: {
                      type: "object",
                      properties: {
                        enableVTPM: {
                          type: "boolean",
                        },
                        enableSecureBoot: {
                          type: "boolean",
                        },
                      },
                    },
                    gpuProfile: {
                      type: "object",
                      properties: {
                        driver: {
                          type: "string",
                        },
                      },
                    },
                    gatewayProfile: {
                      type: "object",
                      properties: {
                        publicIPPrefixSize: {
                          type: "integer",
                        },
                      },
                    },
                    virtualMachinesProfile: {
                      type: "object",
                      properties: {
                        scale: {
                          type: "object",
                          properties: {
                            manual: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  size: {
                                    type: "string",
                                  },
                                  count: {
                                    type: "integer",
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    virtualMachineNodesStatus: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          size: {
                            type: "string",
                          },
                          count: {
                            type: "integer",
                          },
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

export default AgentPools_List;
