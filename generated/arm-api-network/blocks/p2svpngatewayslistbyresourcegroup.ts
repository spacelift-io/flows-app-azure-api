import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const P2sVpnGateways_ListByResourceGroup: AppBlock = {
  name: "P2s Vpn Gateways / List By Resource Group",
  description: "Lists all the P2SVpnGateways in a resource group.",
  category: "P2s Vpn Gateways",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/p2svpnGateways` +
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
                    virtualHub: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                      },
                    },
                    p2SConnectionConfigurations: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          properties: {
                            type: "object",
                            properties: {
                              vpnClientAddressPool: {
                                type: "object",
                                properties: {
                                  addressPrefixes: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                  ipamPoolPrefixAllocations: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        pool: {
                                          type: "object",
                                          properties: {
                                            id: {
                                              type: "string",
                                            },
                                          },
                                        },
                                        numberOfIpAddresses: {
                                          type: "string",
                                        },
                                        allocatedAddressPrefixes: {
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
                              routingConfiguration: {
                                type: "object",
                                properties: {
                                  associatedRouteTable: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  propagatedRouteTables: {
                                    type: "object",
                                    properties: {
                                      labels: {
                                        type: "array",
                                        items: {
                                          type: "string",
                                        },
                                      },
                                      ids: {
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
                                    },
                                  },
                                  vnetRoutes: {
                                    type: "object",
                                    properties: {
                                      staticRoutesConfig: {
                                        type: "object",
                                        properties: {
                                          propagateStaticRoutes: {
                                            type: "boolean",
                                          },
                                          vnetLocalRouteOverrideCriteria: {
                                            type: "string",
                                          },
                                        },
                                      },
                                      staticRoutes: {
                                        type: "array",
                                        items: {
                                          type: "object",
                                          properties: {
                                            name: {
                                              type: "string",
                                            },
                                            addressPrefixes: {
                                              type: "array",
                                              items: {
                                                type: "string",
                                              },
                                            },
                                            nextHopIpAddress: {
                                              type: "string",
                                            },
                                          },
                                        },
                                      },
                                      bgpConnections: {
                                        type: "array",
                                        items: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                    },
                                  },
                                  inboundRouteMap: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  outboundRouteMap: {
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
                              enableInternetSecurity: {
                                type: "boolean",
                              },
                              configurationPolicyGroupAssociations: {
                                type: "array",
                                items: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                              previousConfigurationPolicyGroupAssociations: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    properties: {
                                      type: "object",
                                      properties: {
                                        isDefault: {
                                          type: "boolean",
                                        },
                                        priority: {
                                          type: "integer",
                                        },
                                        policyMembers: {
                                          type: "array",
                                          items: {
                                            type: "object",
                                            properties: {
                                              name: {
                                                type: "string",
                                              },
                                              attributeType: {
                                                type: "string",
                                              },
                                              attributeValue: {
                                                type: "string",
                                              },
                                            },
                                          },
                                        },
                                        p2SConnectionConfigurations: {
                                          type: "array",
                                          items: {
                                            type: "object",
                                            additionalProperties: true,
                                          },
                                        },
                                        provisioningState: {
                                          type: "string",
                                        },
                                      },
                                    },
                                    etag: {
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
                              },
                              provisioningState: {
                                type: "string",
                              },
                            },
                          },
                          name: {
                            type: "string",
                          },
                          etag: {
                            type: "string",
                          },
                        },
                      },
                    },
                    provisioningState: {
                      type: "string",
                    },
                    vpnGatewayScaleUnit: {
                      type: "integer",
                    },
                    vpnServerConfiguration: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                    vpnClientConnectionHealth: {
                      type: "object",
                      properties: {
                        totalIngressBytesTransferred: {
                          type: "integer",
                        },
                        totalEgressBytesTransferred: {
                          type: "integer",
                        },
                        vpnClientConnectionsCount: {
                          type: "integer",
                        },
                        allocatedIpAddresses: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                      },
                    },
                    customDnsServers: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    isRoutingPreferenceInternet: {
                      type: "boolean",
                    },
                  },
                },
                etag: {
                  type: "string",
                },
              },
              required: ["location"],
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

export default P2sVpnGateways_ListByResourceGroup;
