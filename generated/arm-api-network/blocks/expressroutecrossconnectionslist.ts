import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRouteCrossConnections_List: AppBlock = {
  name: "Express Route Cross Connections / List",
  description:
    "Retrieves all the ExpressRouteCrossConnections in a subscription.",
  category: "Express Route Cross Connections",
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
        $filter: {
          name: "Filter",
          description:
            "The filter to apply on the operation. For example, you can use $filter=name eq '{circuitServiceKey}'.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/expressRouteCrossConnections` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.$filter
            ? `&$filter=${input.event.inputConfig.$filter}`
            : "");

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
                    primaryAzurePort: {
                      type: "string",
                    },
                    secondaryAzurePort: {
                      type: "string",
                    },
                    sTag: {
                      type: "integer",
                    },
                    peeringLocation: {
                      type: "string",
                    },
                    bandwidthInMbps: {
                      type: "integer",
                    },
                    expressRouteCircuit: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                      },
                    },
                    serviceProviderProvisioningState: {
                      type: "string",
                    },
                    serviceProviderNotes: {
                      type: "string",
                    },
                    provisioningState: {
                      type: "string",
                    },
                    peerings: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          properties: {
                            type: "object",
                            properties: {
                              peeringType: {
                                type: "string",
                              },
                              state: {
                                type: "string",
                              },
                              azureASN: {
                                type: "integer",
                              },
                              peerASN: {
                                type: "integer",
                              },
                              primaryPeerAddressPrefix: {
                                type: "string",
                              },
                              secondaryPeerAddressPrefix: {
                                type: "string",
                              },
                              primaryAzurePort: {
                                type: "string",
                              },
                              secondaryAzurePort: {
                                type: "string",
                              },
                              sharedKey: {
                                type: "string",
                              },
                              vlanId: {
                                type: "integer",
                              },
                              microsoftPeeringConfig: {
                                type: "object",
                                properties: {
                                  advertisedPublicPrefixes: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                  advertisedCommunities: {
                                    type: "array",
                                    items: {
                                      type: "string",
                                    },
                                  },
                                  advertisedPublicPrefixesState: {
                                    type: "string",
                                  },
                                  legacyMode: {
                                    type: "integer",
                                  },
                                  customerASN: {
                                    type: "integer",
                                  },
                                  routingRegistryName: {
                                    type: "string",
                                  },
                                  advertisedPublicPrefixInfo: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        prefix: {
                                          type: "string",
                                        },
                                        validationId: {
                                          type: "string",
                                        },
                                        signature: {
                                          type: "string",
                                        },
                                        validationState: {
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
                              gatewayManagerEtag: {
                                type: "string",
                              },
                              lastModifiedBy: {
                                type: "string",
                              },
                              ipv6PeeringConfig: {
                                type: "object",
                                properties: {
                                  primaryPeerAddressPrefix: {
                                    type: "string",
                                  },
                                  secondaryPeerAddressPrefix: {
                                    type: "string",
                                  },
                                  microsoftPeeringConfig: {
                                    type: "object",
                                    properties: {
                                      advertisedPublicPrefixes: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      advertisedCommunities: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      advertisedPublicPrefixesState: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      legacyMode: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      customerASN: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      routingRegistryName: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                      advertisedPublicPrefixInfo: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  routeFilter: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "string",
                                      },
                                    },
                                  },
                                  state: {
                                    type: "string",
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

export default ExpressRouteCrossConnections_List;
