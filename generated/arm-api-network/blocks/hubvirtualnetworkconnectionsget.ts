import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const HubVirtualNetworkConnections_Get: AppBlock = {
  name: "Hub Virtual Network Connections / Get",
  description: "Retrieves the details of a HubVirtualNetworkConnection.",
  category: "Hub Virtual Network Connections",
  inputs: {
    default: {
      config: {
        virtualHubName: {
          name: "Virtual Hub Name",
          description: "Name of the virtual hub",
          type: "string",
          required: true,
        },
        connectionName: {
          name: "Connection Name",
          description: "Name of the connection",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualHubs/${input.event.inputConfig.virtualHubName}/hubVirtualNetworkConnections/${input.event.inputConfig.connectionName}` +
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
              remoteVirtualNetwork: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
              allowHubToRemoteVnetTransit: {
                type: "boolean",
              },
              allowRemoteVnetToUseHubVnetGateways: {
                type: "boolean",
              },
              enableInternetSecurity: {
                type: "boolean",
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
  },
};

export default HubVirtualNetworkConnections_Get;
