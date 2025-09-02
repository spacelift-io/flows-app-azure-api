import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRouteGateways_UpdateTags: AppBlock = {
  name: "Express Route Gateways / Update Tags",
  description: "Updates express route gateway tags.",
  category: "Express Route Gateways",
  inputs: {
    default: {
      config: {
        expressRouteGatewayName: {
          name: "Express Route Gateway Name",
          description: "Name of the express route gateway",
          type: "string",
          required: true,
        },
        expressRouteGatewayParameters: {
          name: "Express Route Gateway Parameters",
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
        const requestBody =
          input.event.inputConfig.expressRouteGatewayParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/expressRouteGateways/${input.event.inputConfig.expressRouteGatewayName}` +
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
              expressRouteConnections: {
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
                        expressRouteCircuitPeering: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                          },
                        },
                        authorizationKey: {
                          type: "string",
                        },
                        routingWeight: {
                          type: "integer",
                        },
                        enableInternetSecurity: {
                          type: "boolean",
                        },
                        expressRouteGatewayBypass: {
                          type: "boolean",
                        },
                        enablePrivateLinkFastPath: {
                          type: "boolean",
                        },
                        routingConfiguration: {
                          type: "object",
                          properties: {
                            associatedRouteTable: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "string",
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
                      },
                      required: ["expressRouteCircuitPeering"],
                    },
                    name: {
                      type: "string",
                    },
                  },
                  required: ["name"],
                },
              },
              provisioningState: {
                type: "string",
              },
              virtualHub: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
              allowNonVirtualWanTraffic: {
                type: "boolean",
              },
            },
            required: ["virtualHub"],
          },
          etag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ExpressRouteGateways_UpdateTags;
