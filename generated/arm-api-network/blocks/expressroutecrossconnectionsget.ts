import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRouteCrossConnections_Get: AppBlock = {
  name: "Express Route Cross Connections / Get",
  description: "Gets details about the specified ExpressRouteCrossConnection.",
  category: "Express Route Cross Connections",
  inputs: {
    default: {
      config: {
        crossConnectionName: {
          name: "Cross Connection Name",
          description: "Name of the cross connection",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/${input.event.inputConfig.crossConnectionName}` +
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
  },
};

export default ExpressRouteCrossConnections_Get;
