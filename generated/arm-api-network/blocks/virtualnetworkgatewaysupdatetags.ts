import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGateways_UpdateTags: AppBlock = {
  name: "Virtual Network Gateways / Update Tags",
  description: "Updates a virtual network gateway tags.",
  category: "Virtual Network Gateways",
  inputs: {
    default: {
      config: {
        virtualNetworkGatewayName: {
          name: "Virtual Network Gateway Name",
          description: "Name of the virtual network gateway",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/${input.event.inputConfig.virtualNetworkGatewayName}` +
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
                      required: ["priority", "policyMembers", "isDefault"],
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
    },
  },
};

export default VirtualNetworkGateways_UpdateTags;
