import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const RouteMaps_Get: AppBlock = {
  name: "Route Maps / Get",
  description: "Retrieves the details of a RouteMap.",
  category: "Route Maps",
  inputs: {
    default: {
      config: {
        virtualHubName: {
          name: "Virtual Hub Name",
          description: "Name of the virtual hub",
          type: "string",
          required: true,
        },
        routeMapName: {
          name: "Route Map Name",
          description: "Name of the route map",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualHubs/${input.event.inputConfig.virtualHubName}/routeMaps/${input.event.inputConfig.routeMapName}` +
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
              associatedInboundConnections: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              associatedOutboundConnections: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              rules: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    matchCriteria: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          routePrefix: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          community: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          asPath: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          matchCondition: {
                            type: "string",
                          },
                        },
                      },
                    },
                    actions: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          type: {
                            type: "string",
                          },
                          parameters: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                routePrefix: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                                community: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                                asPath: {
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
                    },
                    nextStepIfMatched: {
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
          type: {
            type: "string",
          },
          id: {
            type: "string",
          },
        },
      },
    },
  },
};

export default RouteMaps_Get;
