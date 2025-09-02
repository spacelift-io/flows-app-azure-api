import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const BackupShortTermRetentionPolicies_Update: AppBlock = {
  name: "Backup Short Term Retention Policies / Update",
  description: "Updates a database's short term retention policy.",
  category: "Backup Short Term Retention Policies",
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
        policyName: {
          name: "Policy Name",
          description: "Name of the policy",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "The short term retention policy info.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  retentionDays: {
                    type: "number",
                  },
                  diffBackupIntervalInHours: {
                    type: "number",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/backupShortTermRetentionPolicies/${input.event.inputConfig.policyName}` +
          "?api-version=2023-08-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
              retentionDays: {
                type: "integer",
              },
              diffBackupIntervalInHours: {
                type: "integer",
              },
            },
          },
        },
      },
    },
  },
};

export default BackupShortTermRetentionPolicies_Update;
