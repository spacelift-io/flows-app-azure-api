import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const JobSteps_CreateOrUpdate: AppBlock = {
  name: "Job Steps / Create Or Update",
  description:
    "Creates or updates a job step. This will implicitly create a new job version.",
  category: "Job Steps",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        jobAgentName: {
          name: "Job Agent Name",
          description: "Name of the job agent",
          type: "string",
          required: true,
        },
        jobName: {
          name: "Job Name",
          description: "Name of the job",
          type: "string",
          required: true,
        },
        stepName: {
          name: "Step Name",
          description: "Name of the step",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "The requested state of the job step.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  stepId: {
                    type: "number",
                  },
                  targetGroup: {
                    type: "string",
                  },
                  credential: {
                    type: "string",
                  },
                  action: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                      },
                      source: {
                        type: "string",
                      },
                      value: {
                        type: "string",
                      },
                    },
                    required: ["value"],
                  },
                  output: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                      },
                      subscriptionId: {
                        type: "string",
                      },
                      resourceGroupName: {
                        type: "string",
                      },
                      serverName: {
                        type: "string",
                      },
                      databaseName: {
                        type: "string",
                      },
                      schemaName: {
                        type: "string",
                      },
                      tableName: {
                        type: "string",
                      },
                      credential: {
                        type: "string",
                      },
                    },
                    required: ["serverName", "databaseName", "tableName"],
                  },
                  executionOptions: {
                    type: "object",
                    properties: {
                      timeoutSeconds: {
                        type: "number",
                      },
                      retryAttempts: {
                        type: "number",
                      },
                      initialRetryIntervalSeconds: {
                        type: "number",
                      },
                      maximumRetryIntervalSeconds: {
                        type: "number",
                      },
                      retryIntervalBackoffMultiplier: {
                        type: "number",
                      },
                    },
                  },
                },
                required: ["targetGroup", "action"],
              },
            },
          },
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/jobAgents/${input.event.inputConfig.jobAgentName}/jobs/${input.event.inputConfig.jobName}/steps/${input.event.inputConfig.stepName}` +
          "?api-version=2023-08-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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
          properties: {
            type: "object",
            properties: {
              stepId: {
                type: "integer",
              },
              targetGroup: {
                type: "string",
              },
              credential: {
                type: "string",
              },
              action: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                  },
                  source: {
                    type: "string",
                  },
                  value: {
                    type: "string",
                  },
                },
                required: ["value"],
              },
              output: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                  },
                  subscriptionId: {
                    type: "string",
                  },
                  resourceGroupName: {
                    type: "string",
                  },
                  serverName: {
                    type: "string",
                  },
                  databaseName: {
                    type: "string",
                  },
                  schemaName: {
                    type: "string",
                  },
                  tableName: {
                    type: "string",
                  },
                  credential: {
                    type: "string",
                  },
                },
                required: ["serverName", "databaseName", "tableName"],
              },
              executionOptions: {
                type: "object",
                properties: {
                  timeoutSeconds: {
                    type: "integer",
                  },
                  retryAttempts: {
                    type: "integer",
                  },
                  initialRetryIntervalSeconds: {
                    type: "integer",
                  },
                  maximumRetryIntervalSeconds: {
                    type: "integer",
                  },
                  retryIntervalBackoffMultiplier: {
                    type: "number",
                  },
                },
              },
            },
            required: ["targetGroup", "action"],
          },
        },
      },
    },
  },
};

export default JobSteps_CreateOrUpdate;
