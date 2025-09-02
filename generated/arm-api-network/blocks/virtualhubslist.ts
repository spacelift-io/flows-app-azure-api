import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualHubs_List: AppBlock = {
  name: "Virtual Hubs / List",
  description: "Lists all the VirtualHubs in a subscription.",
  category: "Virtual Hubs",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/virtualHubs` +
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
                    vpnGateway: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                    p2SVpnGateway: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                    expressRouteGateway: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                    azureFirewall: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                    securityPartnerProvider: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                    addressPrefix: {
                      type: "string",
                    },
                    routeTable: {
                      type: "object",
                      properties: {
                        routes: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
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
                      },
                    },
                    provisioningState: {
                      type: "string",
                    },
                    securityProviderName: {
                      type: "string",
                    },
                    virtualHubRouteTableV2s: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          properties: {
                            type: "object",
                            properties: {
                              routes: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    destinationType: {
                                      type: "string",
                                    },
                                    destinations: {
                                      type: "array",
                                      items: {
                                        type: "string",
                                      },
                                    },
                                    nextHopType: {
                                      type: "string",
                                    },
                                    nextHops: {
                                      type: "array",
                                      items: {
                                        type: "string",
                                      },
                                    },
                                  },
                                },
                              },
                              attachedConnections: {
                                type: "array",
                                items: {
                                  type: "string",
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
                    sku: {
                      type: "string",
                    },
                    routingState: {
                      type: "string",
                    },
                    bgpConnections: {
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
                    ipConfigurations: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    routeMaps: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    virtualRouterAsn: {
                      type: "integer",
                    },
                    virtualRouterIps: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    allowBranchToBranchTraffic: {
                      type: "boolean",
                    },
                    preferredRoutingGateway: {
                      type: "string",
                    },
                    hubRoutingPreference: {
                      type: "string",
                    },
                    virtualRouterAutoScaleConfiguration: {
                      type: "object",
                      properties: {
                        minCapacity: {
                          type: "integer",
                        },
                      },
                    },
                  },
                },
                etag: {
                  type: "string",
                },
                kind: {
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

export default VirtualHubs_List;
