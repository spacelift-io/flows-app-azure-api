import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedInstances_ListByManagedInstance: AppBlock = {
  name: "Managed Instances / List By Managed Instance",
  description: "Get top resource consuming queries of a managed instance.",
  category: "Managed Instances",
  inputs: {
    default: {
      config: {
        managedInstanceName: {
          name: "Managed Instance Name",
          description: "Name of the managed instance",
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
        numberOfQueries: {
          name: "Number Of Queries",
          description: "How many 'top queries' to return. Default is 5.",
          type: "number",
          required: false,
        },
        databases: {
          name: "Databases",
          type: "string",
          required: false,
        },
        startTime: {
          name: "Start Time",
          description: "Start time for observed period.",
          type: "string",
          required: false,
        },
        endTime: {
          name: "End Time",
          description: "End time for observed period.",
          type: "string",
          required: false,
        },
        interval: {
          name: "Interval",
          description:
            "The time step to be used to summarize the metric values. Default value is PT1H",
          type: "string",
          required: false,
        },
        aggregationFunction: {
          name: "Aggregation Function",
          description:
            "Aggregation function to be used, default value is 'sum'",
          type: "string",
          required: false,
        },
        observationMetric: {
          name: "Observation Metric",
          description:
            "Metric to be used for ranking top queries. Default is 'cpu'",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/topqueries` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.numberOfQueries
            ? `&numberOfQueries=${input.event.inputConfig.numberOfQueries}`
            : "") +
          (input.event.inputConfig.databases
            ? `&databases=${input.event.inputConfig.databases}`
            : "") +
          (input.event.inputConfig.startTime
            ? `&startTime=${input.event.inputConfig.startTime}`
            : "") +
          (input.event.inputConfig.endTime
            ? `&endTime=${input.event.inputConfig.endTime}`
            : "") +
          (input.event.inputConfig.interval
            ? `&interval=${input.event.inputConfig.interval}`
            : "") +
          (input.event.inputConfig.aggregationFunction
            ? `&aggregationFunction=${input.event.inputConfig.aggregationFunction}`
            : "") +
          (input.event.inputConfig.observationMetric
            ? `&observationMetric=${input.event.inputConfig.observationMetric}`
            : "");

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
                numberOfQueries: {
                  type: "integer",
                },
                aggregationFunction: {
                  type: "string",
                },
                observationMetric: {
                  type: "string",
                },
                intervalType: {
                  type: "string",
                },
                startTime: {
                  type: "string",
                },
                endTime: {
                  type: "string",
                },
                queries: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      databaseName: {
                        type: "string",
                      },
                      queryId: {
                        type: "string",
                      },
                      startTime: {
                        type: "string",
                      },
                      endTime: {
                        type: "string",
                      },
                      intervals: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            intervalStartTime: {
                              type: "string",
                            },
                            intervalType: {
                              type: "string",
                            },
                            executionCount: {
                              type: "integer",
                            },
                            metrics: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  name: {
                                    type: "string",
                                  },
                                  displayName: {
                                    type: "string",
                                  },
                                  unit: {
                                    type: "string",
                                  },
                                  value: {
                                    type: "number",
                                  },
                                  min: {
                                    type: "number",
                                  },
                                  max: {
                                    type: "number",
                                  },
                                  avg: {
                                    type: "number",
                                  },
                                  sum: {
                                    type: "number",
                                  },
                                  stdev: {
                                    type: "number",
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
          },
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ManagedInstances_ListByManagedInstance;
