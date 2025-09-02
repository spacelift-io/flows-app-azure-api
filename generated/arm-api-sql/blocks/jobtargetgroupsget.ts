import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const JobTargetGroups_Get: AppBlock = {
  name: "Job Target Groups / Get",
  description: "Gets a target group.",
  category: "Job Target Groups",
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
        targetGroupName: {
          name: "Target Group Name",
          description: "Name of the target group",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/jobAgents/${input.event.inputConfig.jobAgentName}/targetGroups/${input.event.inputConfig.targetGroupName}` +
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
              members: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    membershipType: {
                      type: "string",
                    },
                    type: {
                      type: "string",
                    },
                    serverName: {
                      type: "string",
                    },
                    databaseName: {
                      type: "string",
                    },
                    elasticPoolName: {
                      type: "string",
                    },
                    shardMapName: {
                      type: "string",
                    },
                    refreshCredential: {
                      type: "string",
                    },
                  },
                  required: ["type"],
                },
              },
            },
            required: ["members"],
          },
        },
      },
    },
  },
};

export default JobTargetGroups_Get;
