import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkWatchers_ListAvailableProviders: AppBlock = {
  name: "Network Watchers / List Available Providers",
  description:
    "NOTE: This feature is currently in preview and still being tested for stability. Lists all available internet service providers for a specified Azure region.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkWatchers/${input.event.inputConfig.networkWatcherName}/availableProvidersList` +
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
          countries: {
            type: "array",
            items: {
              type: "object",
              properties: {
                countryName: {
                  type: "string",
                },
                providers: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                states: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      stateName: {
                        type: "string",
                      },
                      providers: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      cities: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            cityName: {
                              type: "string",
                            },
                            providers: {
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
              },
            },
          },
        },
        required: ["countries"],
      },
    },
  },
};

export default NetworkWatchers_ListAvailableProviders;
