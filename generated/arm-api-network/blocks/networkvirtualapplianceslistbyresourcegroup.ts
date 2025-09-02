import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkVirtualAppliances_ListByResourceGroup: AppBlock = {
  name: "Network Virtual Appliances / List By Resource Group",
  description: "Lists all Network Virtual Appliances in a resource group.",
  category: "Network Virtual Appliances",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances` +
          "?api-version=2024-10-01";

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
                    nvaSku: {
                      type: "object",
                      properties: {
                        vendor: {
                          type: "string",
                        },
                        bundledScaleUnit: {
                          type: "string",
                        },
                        marketPlaceVersion: {
                          type: "string",
                        },
                      },
                    },
                    addressPrefix: {
                      type: "string",
                    },
                    bootStrapConfigurationBlobs: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    virtualHub: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                      },
                    },
                    cloudInitConfigurationBlobs: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    cloudInitConfiguration: {
                      type: "string",
                    },
                    virtualApplianceAsn: {
                      type: "integer",
                    },
                    sshPublicKey: {
                      type: "string",
                    },
                    virtualApplianceNics: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          nicType: {
                            type: "string",
                          },
                          name: {
                            type: "string",
                          },
                          publicIpAddress: {
                            type: "string",
                          },
                          privateIpAddress: {
                            type: "string",
                          },
                          instanceName: {
                            type: "string",
                          },
                        },
                      },
                    },
                    networkProfile: {
                      type: "object",
                      properties: {
                        networkInterfaceConfigurations: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              type: {
                                type: "string",
                              },
                              properties: {
                                type: "object",
                                properties: {
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
                                            primary: {
                                              type: "boolean",
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
                    additionalNics: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                          hasPublicIp: {
                            type: "boolean",
                          },
                        },
                      },
                    },
                    internetIngressPublicIps: {
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
                    virtualApplianceSites: {
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
                    virtualApplianceConnections: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    inboundSecurityRules: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    provisioningState: {
                      type: "string",
                    },
                    deploymentType: {
                      type: "string",
                    },
                    delegation: {
                      type: "object",
                      properties: {
                        serviceName: {
                          type: "string",
                        },
                        provisioningState: {
                          type: "string",
                        },
                      },
                    },
                    partnerManagedResource: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        internalLoadBalancerId: {
                          type: "string",
                        },
                        standardLoadBalancerId: {
                          type: "string",
                        },
                      },
                    },
                    nvaInterfaceConfigurations: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          subnet: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                            },
                          },
                          type: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          name: {
                            type: "string",
                          },
                        },
                      },
                    },
                    privateIpAddress: {
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default NetworkVirtualAppliances_ListByResourceGroup;
