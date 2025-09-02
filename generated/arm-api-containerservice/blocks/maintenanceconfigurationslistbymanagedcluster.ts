import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const MaintenanceConfigurations_ListByManagedCluster: AppBlock = {
  name: "Maintenance Configurations / List By Managed Cluster",
  description:
    "Gets a list of maintenance configurations in the specified managed cluster.",
  category: "Maintenance Configurations",
  inputs: {
    default: {
      config: {
        resourceName: {
          name: "Resource Name",
          description: "Name of the resource",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/${input.event.inputConfig.resourceName}/maintenanceConfigurations` +
          "?api-version=2025-07-01";

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
                systemData: {
                  type: "object",
                  properties: {
                    createdBy: {
                      type: "string",
                    },
                    createdByType: {
                      type: "string",
                    },
                    createdAt: {
                      type: "string",
                    },
                    lastModifiedBy: {
                      type: "string",
                    },
                    lastModifiedByType: {
                      type: "string",
                    },
                    lastModifiedAt: {
                      type: "string",
                    },
                  },
                },
                properties: {
                  type: "object",
                  properties: {
                    timeInWeek: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          day: {
                            type: "string",
                          },
                          hourSlots: {
                            type: "array",
                            items: {
                              type: "integer",
                            },
                          },
                        },
                      },
                    },
                    notAllowedTime: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          start: {
                            type: "string",
                          },
                          end: {
                            type: "string",
                          },
                        },
                      },
                    },
                    maintenanceWindow: {
                      type: "object",
                      properties: {
                        schedule: {
                          type: "object",
                          properties: {
                            daily: {
                              type: "object",
                              properties: {
                                intervalDays: {
                                  type: "integer",
                                },
                              },
                              required: ["intervalDays"],
                            },
                            weekly: {
                              type: "object",
                              properties: {
                                intervalWeeks: {
                                  type: "integer",
                                },
                                dayOfWeek: {
                                  type: "string",
                                },
                              },
                              required: ["intervalWeeks", "dayOfWeek"],
                            },
                            absoluteMonthly: {
                              type: "object",
                              properties: {
                                intervalMonths: {
                                  type: "integer",
                                },
                                dayOfMonth: {
                                  type: "integer",
                                },
                              },
                              required: ["intervalMonths", "dayOfMonth"],
                            },
                            relativeMonthly: {
                              type: "object",
                              properties: {
                                intervalMonths: {
                                  type: "integer",
                                },
                                weekIndex: {
                                  type: "string",
                                },
                                dayOfWeek: {
                                  type: "string",
                                },
                              },
                              required: [
                                "intervalMonths",
                                "weekIndex",
                                "dayOfWeek",
                              ],
                            },
                          },
                        },
                        durationHours: {
                          type: "integer",
                        },
                        utcOffset: {
                          type: "string",
                        },
                        startDate: {
                          type: "string",
                        },
                        startTime: {
                          type: "string",
                        },
                        notAllowedDates: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              start: {
                                type: "string",
                              },
                              end: {
                                type: "string",
                              },
                            },
                            required: ["start", "end"],
                          },
                        },
                      },
                      required: ["schedule", "durationHours", "startTime"],
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

export default MaintenanceConfigurations_ListByManagedCluster;
