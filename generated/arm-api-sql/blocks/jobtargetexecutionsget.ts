import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const JobTargetExecutions_Get: AppBlock = {
  name: "Job Target Executions / Get",
  description: "Gets a target execution.",
  category: "Job Target Executions",
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
        jobExecutionId: {
          name: "Job Execution ID",
          description: "Unique identifier",
          type: "string",
          required: true,
        },
        stepName: {
          name: "Step Name",
          description: "Name of the step",
          type: "string",
          required: true,
        },
        targetId: {
          name: "Target ID",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/jobAgents/${input.event.inputConfig.jobAgentName}/jobs/${input.event.inputConfig.jobName}/executions/${input.event.inputConfig.jobExecutionId}/steps/${input.event.inputConfig.stepName}/targets/${input.event.inputConfig.targetId}` +
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
          properties: {
            type: "object",
            properties: {
              jobVersion: {
                type: "integer",
              },
              stepName: {
                type: "string",
              },
              stepId: {
                type: "integer",
              },
              jobExecutionId: {
                type: "string",
              },
              lifecycle: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
              createTime: {
                type: "string",
              },
              startTime: {
                type: "string",
              },
              endTime: {
                type: "string",
              },
              currentAttempts: {
                type: "integer",
              },
              currentAttemptStartTime: {
                type: "string",
              },
              lastMessage: {
                type: "string",
              },
              target: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                  },
                  serverName: {
                    type: "string",
                  },
                  databaseName: {
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
};

export default JobTargetExecutions_Get;
