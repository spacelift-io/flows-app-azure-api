import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkWatchers_GetAzureReachabilityReport: AppBlock = {
  name: "Network Watchers / Get Azure Reachability Report",
  description:
    "NOTE: This feature is currently in preview and still being tested for stability. Gets the relative latency score for internet service providers from a specified location to Azure regions.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkWatchers/${input.event.inputConfig.networkWatcherName}/azureReachabilityReport` +
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
          aggregationLevel: {
            type: "string",
          },
          providerLocation: {
            type: "object",
            properties: {
              country: {
                type: "string",
              },
              state: {
                type: "string",
              },
              city: {
                type: "string",
              },
            },
            required: ["country"],
          },
          reachabilityReport: {
            type: "array",
            items: {
              type: "object",
              properties: {
                provider: {
                  type: "string",
                },
                azureLocation: {
                  type: "string",
                },
                latencies: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      timeStamp: {
                        type: "string",
                      },
                      score: {
                        type: "integer",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        required: [
          "aggregationLevel",
          "providerLocation",
          "reachabilityReport",
        ],
      },
    },
  },
};

export default NetworkWatchers_GetAzureReachabilityReport;
