import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRoutePorts_List: AppBlock = {
  name: "Express Route Ports / List",
  description:
    "List all the ExpressRoutePort resources in the specified subscription.",
  category: "Express Route Ports",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/ExpressRoutePorts` +
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
                    peeringLocation: {
                      type: "string",
                    },
                    bandwidthInGbps: {
                      type: "integer",
                    },
                    provisionedBandwidthInGbps: {
                      type: "number",
                    },
                    mtu: {
                      type: "string",
                    },
                    encapsulation: {
                      type: "string",
                    },
                    etherType: {
                      type: "string",
                    },
                    allocationDate: {
                      type: "string",
                    },
                    links: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          properties: {
                            type: "object",
                            properties: {
                              routerName: {
                                type: "string",
                              },
                              interfaceName: {
                                type: "string",
                              },
                              patchPanelId: {
                                type: "string",
                              },
                              rackId: {
                                type: "string",
                              },
                              coloLocation: {
                                type: "string",
                              },
                              connectorType: {
                                type: "string",
                              },
                              adminState: {
                                type: "string",
                              },
                              provisioningState: {
                                type: "string",
                              },
                              macSecConfig: {
                                type: "object",
                                properties: {
                                  cknSecretIdentifier: {
                                    type: "string",
                                  },
                                  cakSecretIdentifier: {
                                    type: "string",
                                  },
                                  cipher: {
                                    type: "string",
                                  },
                                  sciState: {
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
                    circuits: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                        },
                      },
                    },
                    provisioningState: {
                      type: "string",
                    },
                    resourceGuid: {
                      type: "string",
                    },
                    billingType: {
                      type: "string",
                    },
                  },
                },
                etag: {
                  type: "string",
                },
                identity: {
                  type: "object",
                  properties: {
                    principalId: {
                      type: "string",
                    },
                    tenantId: {
                      type: "string",
                    },
                    type: {
                      type: "string",
                    },
                    userAssignedIdentities: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
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

export default ExpressRoutePorts_List;
