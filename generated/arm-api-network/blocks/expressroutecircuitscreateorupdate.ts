import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRouteCircuits_CreateOrUpdate: AppBlock = {
  name: "Express Route Circuits / Create Or Update",
  description: "Creates or updates an express route circuit.",
  category: "Express Route Circuits",
  inputs: {
    default: {
      config: {
        circuitName: {
          name: "Circuit Name",
          description: "Name of the circuit",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/${input.event.inputConfig.circuitName}` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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
          sku: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              tier: {
                type: "string",
              },
              family: {
                type: "string",
              },
            },
          },
          properties: {
            type: "object",
            properties: {
              allowClassicOperations: {
                type: "boolean",
              },
              circuitProvisioningState: {
                type: "string",
              },
              serviceProviderProvisioningState: {
                type: "string",
              },
              authorizations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      type: "object",
                      properties: {
                        authorizationKey: {
                          type: "string",
                        },
                        authorizationUseStatus: {
                          type: "string",
                        },
                        connectionResourceUri: {
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
                    type: {
                      type: "string",
                    },
                  },
                },
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
                        stats: {
                          type: "object",
                          properties: {
                            primarybytesIn: {
                              type: "integer",
                            },
                            primarybytesOut: {
                              type: "integer",
                            },
                            secondarybytesIn: {
                              type: "integer",
                            },
                            secondarybytesOut: {
                              type: "integer",
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
                        routeFilter: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                          },
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
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                            },
                            state: {
                              type: "string",
                            },
                          },
                        },
                        expressRouteConnection: {
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
                                  expressRouteCircuitPeering: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  peerExpressRouteCircuitPeering: {
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
                                  authorizationKey: {
                                    type: "string",
                                  },
                                  ipv6CircuitConnectionConfig: {
                                    type: "object",
                                    properties: {
                                      addressPrefix: {
                                        type: "string",
                                      },
                                      circuitConnectionStatus: {
                                        type: "string",
                                      },
                                    },
                                  },
                                  circuitConnectionStatus: {
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
                              type: {
                                type: "string",
                              },
                            },
                          },
                        },
                        peeredConnections: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              properties: {
                                type: "object",
                                properties: {
                                  expressRouteCircuitPeering: {
                                    type: "object",
                                    properties: {
                                      id: {
                                        type: "object",
                                        additionalProperties: true,
                                      },
                                    },
                                  },
                                  peerExpressRouteCircuitPeering: {
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
                                  circuitConnectionStatus: {
                                    type: "string",
                                  },
                                  connectionName: {
                                    type: "string",
                                  },
                                  authResourceGuid: {
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
                              type: {
                                type: "string",
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
                    type: {
                      type: "string",
                    },
                  },
                },
              },
              serviceKey: {
                type: "string",
              },
              serviceProviderNotes: {
                type: "string",
              },
              serviceProviderProperties: {
                type: "object",
                properties: {
                  serviceProviderName: {
                    type: "string",
                  },
                  peeringLocation: {
                    type: "string",
                  },
                  bandwidthInMbps: {
                    type: "integer",
                  },
                },
              },
              expressRoutePort: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              bandwidthInGbps: {
                type: "number",
              },
              stag: {
                type: "integer",
              },
              provisioningState: {
                type: "string",
              },
              gatewayManagerEtag: {
                type: "string",
              },
              globalReachEnabled: {
                type: "boolean",
              },
              authorizationKey: {
                type: "string",
              },
              authorizationStatus: {
                type: "string",
              },
              enableDirectPortRateLimit: {
                type: "boolean",
              },
            },
          },
          etag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ExpressRouteCircuits_CreateOrUpdate;
