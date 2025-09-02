import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VpnGateways_UpdateTags: AppBlock = {
  name: "Vpn Gateways / Update Tags",
  description: "Updates virtual wan vpn gateway tags.",
  category: "Vpn Gateways",
  inputs: {
    default: {
      config: {
        gatewayName: {
          name: "Gateway Name",
          description: "Name of the gateway",
          type: "string",
          required: true,
        },
        vpnGatewayParameters: {
          name: "Vpn Gateway Parameters",
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
        const requestBody = input.event.inputConfig.vpnGatewayParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/vpnGateways/${input.event.inputConfig.gatewayName}` +
          "?api-version=2024-10-01";

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
              virtualHub: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
              connections: {
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
                              type: "object",
                              additionalProperties: true,
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
                            required: [
                              "localAddressRanges",
                              "remoteAddressRanges",
                            ],
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
              bgpSettings: {
                type: "object",
                properties: {
                  asn: {
                    type: "integer",
                  },
                  bgpPeeringAddress: {
                    type: "string",
                  },
                  peerWeight: {
                    type: "integer",
                  },
                  bgpPeeringAddresses: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        ipconfigurationId: {
                          type: "string",
                        },
                        defaultBgpIpAddresses: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        customBgpIpAddresses: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        tunnelIpAddresses: {
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
              provisioningState: {
                type: "string",
              },
              vpnGatewayScaleUnit: {
                type: "integer",
              },
              ipConfigurations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    publicIpAddress: {
                      type: "string",
                    },
                    privateIpAddress: {
                      type: "string",
                    },
                  },
                },
              },
              enableBgpRouteTranslationForNat: {
                type: "boolean",
              },
              isRoutingPreferenceInternet: {
                type: "boolean",
              },
              natRules: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      type: "object",
                      properties: {
                        provisioningState: {
                          type: "string",
                        },
                        type: {
                          type: "string",
                        },
                        mode: {
                          type: "string",
                        },
                        internalMappings: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              addressSpace: {
                                type: "string",
                              },
                              portRange: {
                                type: "string",
                              },
                            },
                          },
                        },
                        externalMappings: {
                          type: "array",
                          items: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                        ipConfigurationId: {
                          type: "string",
                        },
                        egressVpnSiteLinkConnections: {
                          type: "array",
                          items: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                        ingressVpnSiteLinkConnections: {
                          type: "array",
                          items: {
                            type: "object",
                            additionalProperties: true,
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
                    type: {
                      type: "string",
                    },
                  },
                },
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
  },
};

export default VpnGateways_UpdateTags;
