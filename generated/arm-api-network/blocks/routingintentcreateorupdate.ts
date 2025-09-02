import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const RoutingIntent_CreateOrUpdate: AppBlock = {
  name: "Routing Intent / Create Or Update",
  description:
    "Creates a RoutingIntent resource if it doesn't exist else updates the existing RoutingIntent.",
  category: "Routing Intent",
  inputs: {
    default: {
      config: {
        virtualHubName: {
          name: "Virtual Hub Name",
          description: "Name of the virtual hub",
          type: "string",
          required: true,
        },
        routingIntentName: {
          name: "Routing Intent Name",
          description: "Name of the routing intent",
          type: "string",
          required: true,
        },
        routingIntentParameters: {
          name: "Routing Intent Parameters",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  routingPolicies: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        destinations: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        nextHop: {
                          type: "string",
                        },
                      },
                      required: ["name", "destinations", "nextHop"],
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
            },
          },
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
        const requestBody = input.event.inputConfig.routingIntentParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualHubs/${input.event.inputConfig.virtualHubName}/routingIntent/${input.event.inputConfig.routingIntentName}` +
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
          properties: {
            type: "object",
            properties: {
              routingPolicies: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    destinations: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    nextHop: {
                      type: "string",
                    },
                  },
                  required: ["name", "destinations", "nextHop"],
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
        },
      },
    },
  },
};

export default RoutingIntent_CreateOrUpdate;
