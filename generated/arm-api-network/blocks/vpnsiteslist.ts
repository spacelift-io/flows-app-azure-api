import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VpnSites_List: AppBlock = {
  name: "Vpn Sites / List",
  description: "Lists all the VpnSites in a subscription.",
  category: "Vpn Sites",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/vpnSites` +
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
                    virtualWan: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                      },
                    },
                    deviceProperties: {
                      type: "object",
                      properties: {
                        deviceVendor: {
                          type: "string",
                        },
                        deviceModel: {
                          type: "string",
                        },
                        linkSpeedInMbps: {
                          type: "integer",
                        },
                      },
                    },
                    ipAddress: {
                      type: "string",
                    },
                    siteKey: {
                      type: "string",
                    },
                    addressSpace: {
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
                    bgpProperties: {
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
                    isSecuritySite: {
                      type: "boolean",
                    },
                    vpnSiteLinks: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          properties: {
                            type: "object",
                            properties: {
                              linkProperties: {
                                type: "object",
                                properties: {
                                  linkProviderName: {
                                    type: "string",
                                  },
                                  linkSpeedInMbps: {
                                    type: "integer",
                                  },
                                },
                              },
                              ipAddress: {
                                type: "string",
                              },
                              fqdn: {
                                type: "string",
                              },
                              bgpProperties: {
                                type: "object",
                                properties: {
                                  asn: {
                                    type: "integer",
                                  },
                                  bgpPeeringAddress: {
                                    type: "string",
                                  },
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
                    o365Policy: {
                      type: "object",
                      properties: {
                        breakOutCategories: {
                          type: "object",
                          properties: {
                            allow: {
                              type: "boolean",
                            },
                            optimize: {
                              type: "boolean",
                            },
                            default: {
                              type: "boolean",
                            },
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default VpnSites_List;
