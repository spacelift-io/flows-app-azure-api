import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceEnvironments_ListWebWorkerMetricDefinitions: AppBlock = {
  name: "App Service Environments / List Web Worker Metric Definitions",
  description:
    "Description for Get metric definitions for a worker pool of an App Service Environment.",
  category: "App Service Environments",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        workerPoolName: {
          name: "Worker Pool Name",
          description: "Name of the worker pool",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/${input.event.inputConfig.name}/workerPools/${input.event.inputConfig.workerPoolName}/metricdefinitions` +
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    unit: {
                      type: "string",
                    },
                    primaryAggregationType: {
                      type: "string",
                    },
                    metricAvailabilities: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          timeGrain: {
                            type: "string",
                          },
                          retention: {
                            type: "string",
                          },
                        },
                      },
                    },
                    resourceUri: {
                      type: "string",
                    },
                    properties: {
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
        required: ["value"],
      },
    },
  },
};

export default AppServiceEnvironments_ListWebWorkerMetricDefinitions;
