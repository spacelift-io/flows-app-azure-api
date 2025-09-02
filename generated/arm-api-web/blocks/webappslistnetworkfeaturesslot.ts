import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_ListNetworkFeaturesSlot: AppBlock = {
  name: "Web Apps / List Network Features Slot",
  description:
    "Description for Gets all network features used by the app (or deployment slot, if specified).",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        slot: {
          name: "Slot",
          type: "string",
          required: true,
        },
        view: {
          name: "View",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/networkFeatures/${input.event.inputConfig.view}` +
          "?api-version=2024-11-01";

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
              virtualNetworkName: {
                type: "string",
              },
              virtualNetworkConnection: {
                type: "object",
                properties: {
                  vnetResourceId: {
                    type: "string",
                  },
                  certThumbprint: {
                    type: "string",
                  },
                  certBlob: {
                    type: "string",
                  },
                  routes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        properties: {
                          type: "object",
                          properties: {
                            startAddress: {
                              type: "string",
                            },
                            endAddress: {
                              type: "string",
                            },
                            routeType: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                  resyncRequired: {
                    type: "boolean",
                  },
                  dnsServers: {
                    type: "string",
                  },
                  isSwift: {
                    type: "boolean",
                  },
                },
              },
              hybridConnections: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      type: "object",
                      properties: {
                        entityName: {
                          type: "string",
                        },
                        entityConnectionString: {
                          type: "string",
                        },
                        resourceType: {
                          type: "string",
                        },
                        resourceConnectionString: {
                          type: "string",
                        },
                        hostname: {
                          type: "string",
                        },
                        port: {
                          type: "integer",
                        },
                        biztalkUri: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              hybridConnectionsV2: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      type: "object",
                      properties: {
                        serviceBusNamespace: {
                          type: "string",
                        },
                        relayName: {
                          type: "string",
                        },
                        relayArmUri: {
                          type: "string",
                        },
                        hostname: {
                          type: "string",
                        },
                        port: {
                          type: "integer",
                        },
                        sendKeyName: {
                          type: "string",
                        },
                        sendKeyValue: {
                          type: "string",
                        },
                        serviceBusSuffix: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_ListNetworkFeaturesSlot;
