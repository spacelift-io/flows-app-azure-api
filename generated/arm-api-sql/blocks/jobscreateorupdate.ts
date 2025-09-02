import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Jobs_CreateOrUpdate: AppBlock = {
  name: "Jobs / Create Or Update",
  description: "Creates or updates a job.",
  category: "Jobs",
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
        parameters: {
          name: "Parameters",
          description: "The requested job state.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  version: {
                    type: "number",
                  },
                  schedule: {
                    type: "object",
                    properties: {
                      startTime: {
                        type: "string",
                      },
                      endTime: {
                        type: "string",
                      },
                      type: {
                        type: "string",
                      },
                      enabled: {
                        type: "boolean",
                      },
                      interval: {
                        type: "string",
                      },
                    },
                  },
                },
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/jobAgents/${input.event.inputConfig.jobAgentName}/jobs/${input.event.inputConfig.jobName}` +
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
              description: {
                type: "string",
              },
              version: {
                type: "integer",
              },
              schedule: {
                type: "object",
                properties: {
                  startTime: {
                    type: "string",
                  },
                  endTime: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                  enabled: {
                    type: "boolean",
                  },
                  interval: {
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

export default Jobs_CreateOrUpdate;
