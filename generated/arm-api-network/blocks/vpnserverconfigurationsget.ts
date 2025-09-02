import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VpnServerConfigurations_Get: AppBlock = {
  name: "Vpn Server Configurations / Get",
  description: "Retrieves the details of a VpnServerConfiguration.",
  category: "Vpn Server Configurations",
  inputs: {
    default: {
      config: {
        vpnServerConfigurationName: {
          name: "Vpn Server Configuration Name",
          description: "Name of the vpn server configuration",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/vpnServerConfigurations/${input.event.inputConfig.vpnServerConfigurationName}` +
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
          properties: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              vpnProtocols: {
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
              vpnClientRootCertificates: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    publicCertData: {
                      type: "string",
                    },
                  },
                },
              },
              vpnClientRevokedCertificates: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    thumbprint: {
                      type: "string",
                    },
                  },
                },
              },
              radiusServerRootCertificates: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    publicCertData: {
                      type: "string",
                    },
                  },
                },
              },
              radiusClientRootCertificates: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    thumbprint: {
                      type: "string",
                    },
                  },
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
              aadAuthenticationParameters: {
                type: "object",
                properties: {
                  aadTenant: {
                    type: "string",
                  },
                  aadAudience: {
                    type: "string",
                  },
                  aadIssuer: {
                    type: "string",
                  },
                },
              },
              provisioningState: {
                type: "string",
              },
              p2SVpnGateways: {
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
                                  previousConfigurationPolicyGroupAssociations:
                                    {
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
              configurationPolicyGroups: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              etag: {
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
  },
};

export default VpnServerConfigurations_Get;
