import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const JobExecutions_ListByAgent: AppBlock = {
  name: "Job Executions / List By Agent",
  description: "Lists all executions in a job agent.",
  category: "Job Executions",
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
        createTimeMin: {
          name: "Create Time Min",
          description:
            "If specified, only job executions created at or after the specified time are included.",
          type: "string",
          required: false,
        },
        createTimeMax: {
          name: "Create Time Max",
          description:
            "If specified, only job executions created before the specified time are included.",
          type: "string",
          required: false,
        },
        endTimeMin: {
          name: "End Time Min",
          description:
            "If specified, only job executions completed at or after the specified time are included.",
          type: "string",
          required: false,
        },
        endTimeMax: {
          name: "End Time Max",
          description:
            "If specified, only job executions completed before the specified time are included.",
          type: "string",
          required: false,
        },
        isActive: {
          name: "Is Active",
          description:
            "If specified, only active or only completed job executions are included.",
          type: "boolean",
          required: false,
        },
        $skip: {
          name: "Skip",
          description: "The number of elements in the collection to skip.",
          type: "number",
          required: false,
        },
        $top: {
          name: "Top",
          description: "The number of elements to return from the collection.",
          type: "number",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/jobAgents/${input.event.inputConfig.jobAgentName}/executions` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.createTimeMin
            ? `&createTimeMin=${input.event.inputConfig.createTimeMin}`
            : "") +
          (input.event.inputConfig.createTimeMax
            ? `&createTimeMax=${input.event.inputConfig.createTimeMax}`
            : "") +
          (input.event.inputConfig.endTimeMin
            ? `&endTimeMin=${input.event.inputConfig.endTimeMin}`
            : "") +
          (input.event.inputConfig.endTimeMax
            ? `&endTimeMax=${input.event.inputConfig.endTimeMax}`
            : "") +
          (input.event.inputConfig.isActive
            ? `&isActive=${input.event.inputConfig.isActive}`
            : "") +
          (input.event.inputConfig.$skip
            ? `&$skip=${input.event.inputConfig.$skip}`
            : "") +
          (input.event.inputConfig.$top
            ? `&$top=${input.event.inputConfig.$top}`
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default JobExecutions_ListByAgent;
