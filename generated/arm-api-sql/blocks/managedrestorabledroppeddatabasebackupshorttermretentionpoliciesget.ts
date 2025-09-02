import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedRestorableDroppedDatabaseBackupShortTermRetentionPolicies_Get: AppBlock =
  {
    name: "Managed Restorable Dropped Database Backup Short Term Retention Policies / Get",
    description: "Gets a dropped database's short term retention policy.",
    category:
      "Managed Restorable Dropped Database Backup Short Term Retention Policies",
    inputs: {
      default: {
        config: {
          managedInstanceName: {
            name: "Managed Instance Name",
            description: "Name of the managed instance",
            type: "string",
            required: true,
          },
          restorableDroppedDatabaseId: {
            name: "Restorable Dropped Database ID",
            description: "Unique identifier",
            type: "string",
            required: true,
          },
          policyName: {
            name: "Policy Name",
            description: "Name of the policy",
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
            `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/restorableDroppedDatabases/${input.event.inputConfig.restorableDroppedDatabaseId}/backupShortTermRetentionPolicies/${input.event.inputConfig.policyName}` +
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
                retentionDays: {
                  type: "integer",
                },
              },
            },
          },
        },
      },
    },
  };

export default ManagedRestorableDroppedDatabaseBackupShortTermRetentionPolicies_Get;
