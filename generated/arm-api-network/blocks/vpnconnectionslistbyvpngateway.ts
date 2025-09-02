import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VpnConnections_ListByVpnGateway: AppBlock = {
  name: "Vpn Connections / List By Vpn Gateway",
  description:
    "Retrieves all vpn connections for a particular virtual wan vpn gateway.",
  category: "Vpn Connections",
  inputs: {
    default: {
      config: {
        gatewayName: {
          name: "Gateway Name",
          description: "Name of the gateway",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/vpnGateways/${input.event.inputConfig.gatewayName}/vpnConnections` +
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
                    remoteVpnSite: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                      },
                    },
                    routingWeight: {
                      type: "integer",
                    },
                    dpdTimeoutSeconds: {
                      type: "integer",
                    },
                    connectionStatus: {
                      type: "string",
                    },
                    vpnConnectionProtocolType: {
                      type: "string",
                    },
                    ingressBytesTransferred: {
                      type: "integer",
                    },
                    egressBytesTransferred: {
                      type: "integer",
                    },
                    connectionBandwidth: {
                      type: "integer",
                    },
                    sharedKey: {
                      type: "string",
                    },
                    enableBgp: {
                      type: "boolean",
                    },
                    usePolicyBasedTrafficSelectors: {
                      type: "boolean",
                    },
                    ipsecPolicies: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          saLifeTimeSeconds: {
                            type: "integer",
                          },
                          saDataSizeKilobytes: {
                            type: "integer",
                          },
                          ipsecEncryption: {
                            type: "string",
                          },
                          ipsecIntegrity: {
                            type: "string",
                          },
                          ikeEncryption: {
                            type: "string",
                          },
                          ikeIntegrity: {
                            type: "string",
                          },
                          dhGroup: {
                            type: "string",
                          },
                          pfsGroup: {
                            type: "string",
                          },
                        },
                        required: [
                          "saLifeTimeSeconds",
                          "saDataSizeKilobytes",
                          "ipsecEncryption",
                          "ipsecIntegrity",
                          "ikeEncryption",
                          "ikeIntegrity",
                          "dhGroup",
                          "pfsGroup",
                        ],
                      },
                    },
                    trafficSelectorPolicies: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          localAddressRanges: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          remoteAddressRanges: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                        },
                        required: ["localAddressRanges", "remoteAddressRanges"],
                      },
                    },
                    enableRateLimiting: {
                      type: "boolean",
                    },
                    enableInternetSecurity: {
                      type: "boolean",
                    },
                    useLocalAzureIpAddress: {
                      type: "boolean",
                    },
                    provisioningState: {
                      type: "string",
                    },
                    vpnLinkConnections: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          properties: {
                            type: "object",
                            properties: {
                              vpnSiteLink: {
                                type: "object",
                                properties: {
                                  id: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                },
                              },
                              routingWeight: {
                                type: "integer",
                              },
                              vpnLinkConnectionMode: {
                                type: "string",
                              },
                              connectionStatus: {
                                type: "string",
                              },
                              vpnConnectionProtocolType: {
                                type: "string",
                              },
                              ingressBytesTransferred: {
                                type: "integer",
                              },
                              egressBytesTransferred: {
                                type: "integer",
                              },
                              connectionBandwidth: {
                                type: "integer",
                              },
                              sharedKey: {
                                type: "string",
                              },
                              enableBgp: {
                                type: "boolean",
                              },
                              vpnGatewayCustomBgpAddresses: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    ipConfigurationId: {
                                      type: "string",
                                    },
                                    customBgpIpAddress: {
                                      type: "string",
                                    },
                                  },
                                  required: [
                                    "ipConfigurationId",
                                    "customBgpIpAddress",
                                  ],
                                },
                              },
                              usePolicyBasedTrafficSelectors: {
                                type: "boolean",
                              },
                              ipsecPolicies: {
                                type: "array",
                                items: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                              enableRateLimiting: {
                                type: "boolean",
                              },
                              useLocalAzureIpAddress: {
                                type: "boolean",
                              },
                              provisioningState: {
                                type: "string",
                              },
                              ingressNatRules: {
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
                              egressNatRules: {
                                type: "array",
                                items: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                              dpdTimeoutSeconds: {
                                type: "integer",
                              },
                            },
                          },
                          name: {
                            type: "string",
                          },
                          etag: {
                            type: "string",
                          },
                          type: {
                            type: "string",
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
                                additionalProperties: true,
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default VpnConnections_ListByVpnGateway;
