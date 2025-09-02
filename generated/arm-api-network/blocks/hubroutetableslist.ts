import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const HubRouteTables_List: AppBlock = {
  name: "Hub Route Tables / List",
  description: "Retrieves the details of all RouteTables.",
  category: "Hub Route Tables",
  inputs: {
    default: {
      config: {
        virtualHubName: {
          name: "Virtual Hub Name",
          description: "Name of the virtual hub",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualHubs/${input.event.inputConfig.virtualHubName}/hubRouteTables` +
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
                    routes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                          destinationType: {
                            type: "string",
                          },
                          destinations: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          nextHopType: {
                            type: "string",
                          },
                          nextHop: {
                            type: "string",
                          },
                        },
                        required: [
                          "name",
                          "destinationType",
                          "destinations",
                          "nextHopType",
                          "nextHop",
                        ],
                      },
                    },
                    labels: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    associatedConnections: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    propagatingConnections: {
                      type: "array",
                      items: {
                        type: "string",
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default HubRouteTables_List;
