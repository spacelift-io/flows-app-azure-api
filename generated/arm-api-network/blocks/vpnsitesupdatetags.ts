import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VpnSites_UpdateTags: AppBlock = {
  name: "Vpn Sites / Update Tags",
  description: "Updates VpnSite tags.",
  category: "Vpn Sites",
  inputs: {
    default: {
      config: {
        vpnSiteName: {
          name: "Vpn Site Name",
          description: "Name of the vpn site",
          type: "string",
          required: true,
        },
        VpnSiteParameters: {
          name: "Vpn Site Parameters",
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
        const requestBody = input.event.inputConfig.VpnSiteParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/vpnSites/${input.event.inputConfig.vpnSiteName}` +
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
  },
};

export default VpnSites_UpdateTags;
