import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WorkloadGroups_CreateOrUpdate: AppBlock = {
  name: "Workload Groups / Create Or Update",
  description: "Creates or updates a workload group.",
  category: "Workload Groups",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        databaseName: {
          name: "Database Name",
          description: "Name of the database",
          type: "string",
          required: true,
        },
        workloadGroupName: {
          name: "Workload Group Name",
          description: "Name of the workload group",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "The requested workload group state.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  minResourcePercent: {
                    type: "number",
                  },
                  maxResourcePercent: {
                    type: "number",
                  },
                  minResourcePercentPerRequest: {
                    type: "number",
                  },
                  maxResourcePercentPerRequest: {
                    type: "number",
                  },
                  importance: {
                    type: "string",
                  },
                  queryExecutionTimeout: {
                    type: "number",
                  },
                },
                required: [
                  "minResourcePercent",
                  "maxResourcePercent",
                  "minResourcePercentPerRequest",
                ],
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/workloadGroups/${input.event.inputConfig.workloadGroupName}` +
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
              minResourcePercent: {
                type: "integer",
              },
              maxResourcePercent: {
                type: "integer",
              },
              minResourcePercentPerRequest: {
                type: "number",
              },
              maxResourcePercentPerRequest: {
                type: "number",
              },
              importance: {
                type: "string",
              },
              queryExecutionTimeout: {
                type: "integer",
              },
            },
            required: [
              "minResourcePercent",
              "maxResourcePercent",
              "minResourcePercentPerRequest",
            ],
          },
        },
      },
    },
  },
};

export default WorkloadGroups_CreateOrUpdate;
