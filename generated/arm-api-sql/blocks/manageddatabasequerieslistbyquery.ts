import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedDatabaseQueries_ListByQuery: AppBlock = {
  name: "Managed Database Queries / List By Query",
  description: "Get query execution statistics by query id.",
  category: "Managed Database Queries",
  inputs: {
    default: {
      config: {
        managedInstanceName: {
          name: "Managed Instance Name",
          description: "Name of the managed instance",
          type: "string",
          required: true,
        },
        databaseName: {
          name: "Database Name",
          description: "Name of the database",
          type: "string",
          required: true,
        },
        queryId: {
          name: "Query ID",
          description: "Unique identifier",
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
            "The time step to be used to summarize the metric values.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/databases/${input.event.inputConfig.databaseName}/queries/${input.event.inputConfig.queryId}/statistics` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.startTime
            ? `&startTime=${input.event.inputConfig.startTime}`
            : "") +
          (input.event.inputConfig.endTime
            ? `&endTime=${input.event.inputConfig.endTime}`
            : "") +
          (input.event.inputConfig.interval
            ? `&interval=${input.event.inputConfig.interval}`
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
                properties: {
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ManagedDatabaseQueries_ListByQuery;
