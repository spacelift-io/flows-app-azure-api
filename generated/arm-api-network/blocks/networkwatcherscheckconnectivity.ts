import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkWatchers_CheckConnectivity: AppBlock = {
  name: "Network Watchers / Check Connectivity",
  description:
    "Verifies the possibility of establishing a direct TCP connection from a virtual machine to a given endpoint including another VM or an arbitrary remote server.",
  category: "Network Watchers",
  inputs: {
    default: {
      config: {
        networkWatcherName: {
          name: "Network Watcher Name",
          description: "Name of the network watcher",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkWatchers/${input.event.inputConfig.networkWatcherName}/connectivityCheck` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          hops: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                },
                id: {
                  type: "string",
                },
                address: {
                  type: "string",
                },
                resourceId: {
                  type: "string",
                },
                nextHopIds: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                previousHopIds: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                links: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      nextHopId: {
                        type: "string",
                      },
                      linkType: {
                        type: "string",
                      },
                      properties: {
                        type: "object",
                        properties: {
                          roundTripTimeMin: {
                            type: "integer",
                          },
                          roundTripTimeAvg: {
                            type: "integer",
                          },
                          roundTripTimeMax: {
                            type: "integer",
                          },
                        },
                      },
                      issues: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            origin: {
                              type: "string",
                            },
                            severity: {
                              type: "string",
                            },
                            type: {
                              type: "string",
                            },
                            context: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                          },
                        },
                      },
                      context: {
                        type: "object",
                        additionalProperties: true,
                      },
                      resourceId: {
                        type: "string",
                      },
                    },
                  },
                },
                previousLinks: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                issues: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
            },
          },
          connectionStatus: {
            type: "string",
          },
          avgLatencyInMs: {
            type: "integer",
          },
          minLatencyInMs: {
            type: "integer",
          },
          maxLatencyInMs: {
            type: "integer",
          },
          probesSent: {
            type: "integer",
          },
          probesFailed: {
            type: "integer",
          },
        },
      },
    },
  },
};

export default NetworkWatchers_CheckConnectivity;
