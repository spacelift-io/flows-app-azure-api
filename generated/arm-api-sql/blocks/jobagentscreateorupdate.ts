import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const JobAgents_CreateOrUpdate: AppBlock = {
  name: "Job Agents / Create Or Update",
  description: "Creates or updates a job agent.",
  category: "Job Agents",
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
        parameters: {
          name: "Parameters",
          description: "The requested job agent resource state.",
          type: {
            type: "object",
            properties: {
              sku: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  tier: {
                    type: "string",
                  },
                  size: {
                    type: "string",
                  },
                  family: {
                    type: "string",
                  },
                  capacity: {
                    type: "number",
                  },
                },
                required: ["name"],
              },
              identity: {
                type: "object",
                properties: {
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
              properties: {
                type: "object",
                properties: {
                  databaseId: {
                    type: "string",
                  },
                  state: {
                    type: "string",
                  },
                },
                required: ["databaseId"],
              },
            },
            required: ["location"],
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/jobAgents/${input.event.inputConfig.jobAgentName}` +
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
          sku: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              tier: {
                type: "string",
              },
              size: {
                type: "string",
              },
              family: {
                type: "string",
              },
              capacity: {
                type: "integer",
              },
            },
            required: ["name"],
          },
          identity: {
            type: "object",
            properties: {
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
          properties: {
            type: "object",
            properties: {
              databaseId: {
                type: "string",
              },
              state: {
                type: "string",
              },
            },
            required: ["databaseId"],
          },
        },
        required: ["location"],
      },
    },
  },
};

export default JobAgents_CreateOrUpdate;
