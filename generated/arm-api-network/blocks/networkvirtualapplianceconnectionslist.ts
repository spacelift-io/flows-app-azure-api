import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkVirtualApplianceConnections_List: AppBlock = {
  name: "Network Virtual Appliance Connections / List",
  description: "Lists NetworkVirtualApplianceConnections under the NVA.",
  category: "Network Virtual Appliance Connections",
  inputs: {
    default: {
      config: {
        networkVirtualApplianceName: {
          name: "Network Virtual Appliance Name",
          description: "Name of the network virtual appliance",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/${input.event.inputConfig.networkVirtualApplianceName}/networkVirtualApplianceConnections` +
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
                    name: {
                      type: "string",
                    },
                    provisioningState: {
                      type: "string",
                    },
                    asn: {
                      type: "integer",
                    },
                    tunnelIdentifier: {
                      type: "integer",
                    },
                    bgpPeerAddress: {
                      type: "array",
                      items: {
                        type: "string",
                      },
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
                },
                name: {
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

export default NetworkVirtualApplianceConnections_List;
