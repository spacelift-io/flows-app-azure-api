import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ScheduledQueryRules_ListBySubscription: AppBlock = {
  name: "Scheduled Query Rules / List By Subscription",
  description: "Retrieve a scheduled query rule definitions in a subscription.",
  category: "Scheduled Query Rules",
  inputs: {
    default: {
      config: {
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Insights/scheduledQueryRules` +
          "?api-version=2023-12-01";

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
                id: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                identity: {
                  type: "object",
                  properties: {
                    principalId: {
                      type: "string",
                    },
                    tenantId: {
                      type: "string",
                    },
                    type: {
                      type: "string",
                    },
                    userAssignedIdentities: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  required: ["type"],
                },
                tags: {
                  type: "object",
                  additionalProperties: true,
                },
                location: {
                  type: "string",
                },
                kind: {
                  type: "string",
                },
                etag: {
                  type: "string",
                },
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
                    createdWithApiVersion: {
                      type: "string",
                    },
                    isLegacyLogAnalyticsRule: {
                      type: "boolean",
                    },
                    description: {
                      type: "string",
                    },
                    displayName: {
                      type: "string",
                    },
                    severity: {
                      type: "integer",
                    },
                    enabled: {
                      type: "boolean",
                    },
                    scopes: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    evaluationFrequency: {
                      type: "string",
                    },
                    windowSize: {
                      type: "string",
                    },
                    overrideQueryTimeRange: {
                      type: "string",
                    },
                    targetResourceTypes: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    criteria: {
                      type: "object",
                      properties: {
                        allOf: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              query: {
                                type: "string",
                              },
                              timeAggregation: {
                                type: "string",
                              },
                              metricMeasureColumn: {
                                type: "string",
                              },
                              resourceIdColumn: {
                                type: "string",
                              },
                              dimensions: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    name: {
                                      type: "string",
                                    },
                                    operator: {
                                      type: "string",
                                    },
                                    values: {
                                      type: "array",
                                      items: {
                                        type: "string",
                                      },
                                    },
                                  },
                                  required: ["name", "operator", "values"],
                                },
                              },
                              operator: {
                                type: "string",
                              },
                              threshold: {
                                type: "number",
                              },
                              failingPeriods: {
                                type: "object",
                                properties: {
                                  numberOfEvaluationPeriods: {
                                    type: "integer",
                                  },
                                  minFailingPeriodsToAlert: {
                                    type: "integer",
                                  },
                                },
                              },
                              metricName: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                    },
                    muteActionsDuration: {
                      type: "string",
                    },
                    actions: {
                      type: "object",
                      properties: {
                        actionGroups: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        customProperties: {
                          type: "object",
                          additionalProperties: true,
                        },
                        actionProperties: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                    isWorkspaceAlertsStorageConfigured: {
                      type: "boolean",
                    },
                    checkWorkspaceAlertsStorageConfigured: {
                      type: "boolean",
                    },
                    skipQueryValidation: {
                      type: "boolean",
                    },
                    autoMitigate: {
                      type: "boolean",
                    },
                    resolveConfiguration: {
                      type: "object",
                      properties: {
                        autoResolved: {
                          type: "boolean",
                        },
                        timeToResolve: {
                          type: "string",
                        },
                      },
                    },
                  },
                  required: ["enabled", "criteria", "scopes"],
                },
              },
              required: ["properties", "location"],
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

export default ScheduledQueryRules_ListBySubscription;
