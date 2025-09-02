import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceEnvironments_ListMultiRolePoolInstanceMetricDefinitions: AppBlock =
  {
    name: "App Service Environments / List Multi Role Pool Instance Metric Definitions",
    description:
      "Description for Get metric definitions for a specific instance of a multi-role pool of an App Service Environment.",
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
          instance: {
            name: "Instance",
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
            `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/${input.event.inputConfig.name}/multiRolePools/default/instances/${input.event.inputConfig.instance}/metricdefinitions` +
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

export default AppServiceEnvironments_ListMultiRolePoolInstanceMetricDefinitions;
