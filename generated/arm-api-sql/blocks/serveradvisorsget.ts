import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ServerAdvisors_Get: AppBlock = {
  name: "Server Advisors / Get",
  description: "Gets a server advisor.",
  category: "Server Advisors",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        advisorName: {
          name: "Advisor Name",
          description: "Name of the advisor",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/advisors/${input.event.inputConfig.advisorName}` +
          "?api-version=2023-08-01";

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
          kind: {
            type: "string",
          },
          location: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              advisorStatus: {
                type: "string",
              },
              autoExecuteStatus: {
                type: "string",
              },
              autoExecuteStatusInheritedFrom: {
                type: "string",
              },
              recommendationsStatus: {
                type: "string",
              },
              lastChecked: {
                type: "string",
              },
              recommendedActions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    kind: {
                      type: "string",
                    },
                    location: {
                      type: "string",
                    },
                    properties: {
                      type: "object",
                      properties: {
                        recommendationReason: {
                          type: "string",
                        },
                        validSince: {
                          type: "string",
                        },
                        lastRefresh: {
                          type: "string",
                        },
                        state: {
                          type: "object",
                          properties: {
                            currentValue: {
                              type: "string",
                            },
                            actionInitiatedBy: {
                              type: "string",
                            },
                            lastModified: {
                              type: "string",
                            },
                          },
                          required: ["currentValue"],
                        },
                        isExecutableAction: {
                          type: "boolean",
                        },
                        isRevertableAction: {
                          type: "boolean",
                        },
                        isArchivedAction: {
                          type: "boolean",
                        },
                        executeActionStartTime: {
                          type: "string",
                        },
                        executeActionDuration: {
                          type: "string",
                        },
                        revertActionStartTime: {
                          type: "string",
                        },
                        revertActionDuration: {
                          type: "string",
                        },
                        executeActionInitiatedBy: {
                          type: "string",
                        },
                        executeActionInitiatedTime: {
                          type: "string",
                        },
                        revertActionInitiatedBy: {
                          type: "string",
                        },
                        revertActionInitiatedTime: {
                          type: "string",
                        },
                        score: {
                          type: "integer",
                        },
                        implementationDetails: {
                          type: "object",
                          properties: {
                            method: {
                              type: "string",
                            },
                            script: {
                              type: "string",
                            },
                          },
                        },
                        errorDetails: {
                          type: "object",
                          properties: {
                            errorCode: {
                              type: "string",
                            },
                            isRetryable: {
                              type: "string",
                            },
                          },
                        },
                        estimatedImpact: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              dimensionName: {
                                type: "string",
                              },
                              unit: {
                                type: "string",
                              },
                              absoluteValue: {
                                type: "number",
                              },
                              changeValueAbsolute: {
                                type: "number",
                              },
                              changeValueRelative: {
                                type: "number",
                              },
                            },
                          },
                        },
                        observedImpact: {
                          type: "array",
                          items: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                        timeSeries: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              metricName: {
                                type: "string",
                              },
                              unit: {
                                type: "string",
                              },
                              timeGrain: {
                                type: "string",
                              },
                              startTime: {
                                type: "string",
                              },
                              value: {
                                type: "number",
                              },
                            },
                          },
                        },
                        linkedObjects: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        details: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                      required: ["state"],
                    },
                    id: {
                      type: "string",
                    },
                    name: {
                      type: "string",
                    },
                    type: {
                      type: "string",
                    },
                  },
                },
              },
            },
            required: ["autoExecuteStatus"],
          },
        },
      },
    },
  },
};

export default ServerAdvisors_Get;
