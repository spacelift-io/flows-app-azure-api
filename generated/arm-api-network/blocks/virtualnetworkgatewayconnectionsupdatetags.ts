import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGatewayConnections_UpdateTags: AppBlock = {
  name: "Virtual Network Gateway Connections / Update Tags",
  description: "Updates a virtual network gateway connection tags.",
  category: "Virtual Network Gateway Connections",
  inputs: {
    default: {
      config: {
        virtualNetworkGatewayConnectionName: {
          name: "Virtual Network Gateway Connection Name",
          description: "Name of the virtual network gateway connection",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/connections/${input.event.inputConfig.virtualNetworkGatewayConnectionName}` +
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
              authorizationKey: {
                type: "string",
              },
              virtualNetworkGateway1: {
                type: "object",
                properties: {
                  properties: {
                    type: "object",
                    properties: {
                      autoScaleConfiguration: {
                        type: "object",
                        properties: {
                          bounds: {
                            type: "object",
                            properties: {
                              min: {
                                type: "integer",
                              },
                              max: {
                                type: "integer",
                              },
                            },
                          },
                        },
                      },
                      ipConfigurations: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            properties: {
                              type: "object",
                              properties: {
                                privateIPAllocationMethod: {
                                  type: "string",
                                },
                                subnet: {
                                  type: "object",
                                  properties: {
                                    id: {
                                      type: "string",
                                    },
                                  },
                                },
                                publicIPAddress: {
                                  type: "object",
                                  properties: {
                                    id: {
                                      type: "object",
                                      additionalProperties: true,
                                    },
                                  },
                                },
                                privateIPAddress: {
                                  type: "string",
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
                      gatewayType: {
                        type: "string",
                      },
                      vpnType: {
                        type: "string",
                      },
                      vpnGatewayGeneration: {
                        type: "string",
                      },
                      enableBgp: {
                        type: "boolean",
                      },
                      enablePrivateIpAddress: {
                        type: "boolean",
                      },
                      virtualNetworkGatewayMigrationStatus: {
                        type: "object",
                        properties: {
                          state: {
                            type: "string",
                          },
                          phase: {
                            type: "string",
                          },
                          errorMessage: {
                            type: "string",
                          },
                        },
                      },
                      activeActive: {
                        type: "boolean",
                      },
                      enableHighBandwidthVpnGateway: {
                        type: "boolean",
                      },
                      disableIPSecReplayProtection: {
                        type: "boolean",
                      },
                      gatewayDefaultSite: {
                        type: "object",
                        properties: {
                          id: {
                            type: "object",
                            additionalProperties: true,
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
                          capacity: {
                            type: "integer",
                          },
                        },
                      },
                      vpnClientConfiguration: {
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
                          vpnClientRootCertificates: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                properties: {
                                  type: "object",
                                  properties: {
                                    publicCertData: {
                                      type: "string",
                                    },
                                    provisioningState: {
                                      type: "string",
                                    },
                                  },
                                  required: ["publicCertData"],
                                },
                                name: {
                                  type: "string",
                                },
                                etag: {
                                  type: "string",
                                },
                              },
                              required: ["properties"],
                            },
                          },
                          vpnClientRevokedCertificates: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                properties: {
                                  type: "object",
                                  properties: {
                                    thumbprint: {
                                      type: "string",
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
                          vpnClientProtocols: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          vpnAuthenticationTypes: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          vpnClientIpsecPolicies: {
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
                          radiusServerAddress: {
                            type: "string",
                          },
                          radiusServerSecret: {
                            type: "string",
                          },
                          radiusServers: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                radiusServerAddress: {
                                  type: "string",
                                },
                                radiusServerScore: {
                                  type: "integer",
                                },
                                radiusServerSecret: {
                                  type: "string",
                                },
                              },
                              required: ["radiusServerAddress"],
                            },
                          },
                          aadTenant: {
                            type: "string",
                          },
                          aadAudience: {
                            type: "string",
                          },
                          aadIssuer: {
                            type: "string",
                          },
                          vngClientConnectionConfigurations: {
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
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        ipamPoolPrefixAllocations: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                    },
                                    virtualNetworkGatewayPolicyGroups: {
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
                                    provisioningState: {
                                      type: "string",
                                    },
                                  },
                                  required: [
                                    "vpnClientAddressPool",
                                    "virtualNetworkGatewayPolicyGroups",
                                  ],
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
                        },
                      },
                      virtualNetworkGatewayPolicyGroups: {
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
                                vngClientConnectionConfigurations: {
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
                              required: [
                                "priority",
                                "policyMembers",
                                "isDefault",
                              ],
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
                      customRoutes: {
                        type: "object",
                        properties: {
                          addressPrefixes: {
                            type: "object",
                            additionalProperties: true,
                          },
                          ipamPoolPrefixAllocations: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                      resourceGuid: {
                        type: "string",
                      },
                      provisioningState: {
                        type: "string",
                      },
                      enableDnsForwarding: {
                        type: "boolean",
                      },
                      inboundDnsForwardingEndpoint: {
                        type: "string",
                      },
                      vNetExtendedLocationResourceId: {
                        type: "string",
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
                      enableBgpRouteTranslationForNat: {
                        type: "boolean",
                      },
                      allowVirtualWanTraffic: {
                        type: "boolean",
                      },
                      allowRemoteVnetTraffic: {
                        type: "boolean",
                      },
                      adminState: {
                        type: "string",
                      },
                      resiliencyModel: {
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
                  etag: {
                    type: "string",
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
                },
                required: ["properties"],
              },
              virtualNetworkGateway2: {
                type: "object",
                properties: {
                  properties: {
                    type: "object",
                    additionalProperties: true,
                  },
                  extendedLocation: {
                    type: "object",
                    additionalProperties: true,
                  },
                  etag: {
                    type: "object",
                    additionalProperties: true,
                  },
                  identity: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                required: ["properties"],
              },
              localNetworkGateway2: {
                type: "object",
                properties: {
                  properties: {
                    type: "object",
                    properties: {
                      localNetworkAddressSpace: {
                        type: "object",
                        properties: {
                          addressPrefixes: {
                            type: "object",
                            additionalProperties: true,
                          },
                          ipamPoolPrefixAllocations: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                      gatewayIpAddress: {
                        type: "string",
                      },
                      fqdn: {
                        type: "string",
                      },
                      bgpSettings: {
                        type: "object",
                        properties: {
                          asn: {
                            type: "object",
                            additionalProperties: true,
                          },
                          bgpPeeringAddress: {
                            type: "object",
                            additionalProperties: true,
                          },
                          peerWeight: {
                            type: "object",
                            additionalProperties: true,
                          },
                          bgpPeeringAddresses: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                      resourceGuid: {
                        type: "string",
                      },
                      provisioningState: {
                        type: "string",
                      },
                    },
                  },
                  etag: {
                    type: "string",
                  },
                },
                required: ["properties"],
              },
              ingressNatRules: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              egressNatRules: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              connectionType: {
                type: "string",
              },
              connectionProtocol: {
                type: "string",
              },
              routingWeight: {
                type: "integer",
              },
              dpdTimeoutSeconds: {
                type: "integer",
              },
              connectionMode: {
                type: "string",
              },
              tunnelProperties: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    tunnelIpAddress: {
                      type: "string",
                    },
                    bgpPeeringAddress: {
                      type: "string",
                    },
                  },
                },
              },
              sharedKey: {
                type: "string",
              },
              connectionStatus: {
                type: "string",
              },
              tunnelConnectionStatus: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    tunnel: {
                      type: "string",
                    },
                    connectionStatus: {
                      type: "string",
                    },
                    ingressBytesTransferred: {
                      type: "integer",
                    },
                    egressBytesTransferred: {
                      type: "integer",
                    },
                    lastConnectionEstablishedUtcTime: {
                      type: "string",
                    },
                  },
                },
              },
              egressBytesTransferred: {
                type: "integer",
              },
              ingressBytesTransferred: {
                type: "integer",
              },
              peer: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              enableBgp: {
                type: "boolean",
              },
              gatewayCustomBgpIpAddresses: {
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
                  required: ["ipConfigurationId", "customBgpIpAddress"],
                },
              },
              useLocalAzureIpAddress: {
                type: "boolean",
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
              resourceGuid: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
              expressRouteGatewayBypass: {
                type: "boolean",
              },
              enablePrivateLinkFastPath: {
                type: "boolean",
              },
            },
            required: ["virtualNetworkGateway1", "connectionType"],
          },
          etag: {
            type: "string",
          },
        },
        required: ["properties"],
      },
    },
  },
};

export default VirtualNetworkGatewayConnections_UpdateTags;
