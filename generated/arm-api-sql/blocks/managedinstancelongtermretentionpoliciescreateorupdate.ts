import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedInstanceLongTermRetentionPolicies_CreateOrUpdate: AppBlock = {
  name: "Managed Instance Long Term Retention Policies / Create Or Update",
  description: "Sets a managed database's long term retention policy.",
  category: "Managed Instance Long Term Retention Policies",
  inputs: {
    default: {
      config: {
        managedInstanceName: {
          name: "Managed Instance Name",
          description: "Name of the managed instance",
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
          description: "The long term retention policy info.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  backupStorageAccessTier: {
                    type: "string",
                  },
                  weeklyRetention: {
                    type: "string",
                  },
                  monthlyRetention: {
                    type: "string",
                  },
                  yearlyRetention: {
                    type: "string",
                  },
                  weekOfYear: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/databases/${input.event.inputConfig.databaseName}/backupLongTermRetentionPolicies/${input.event.inputConfig.policyName}` +
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
              backupStorageAccessTier: {
                type: "string",
              },
              weeklyRetention: {
                type: "string",
              },
              monthlyRetention: {
                type: "string",
              },
              yearlyRetention: {
                type: "string",
              },
              weekOfYear: {
                type: "integer",
              },
            },
          },
        },
      },
    },
  },
};

export default ManagedInstanceLongTermRetentionPolicies_CreateOrUpdate;
