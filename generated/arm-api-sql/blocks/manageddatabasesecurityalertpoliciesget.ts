import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedDatabaseSecurityAlertPolicies_Get: AppBlock = {
  name: "Managed Database Security Alert Policies / Get",
  description: "Gets a managed database's security alert policy.",
  category: "Managed Database Security Alert Policies",
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
        securityAlertPolicyName: {
          name: "Security Alert Policy Name",
          description: "Name of the security alert policy",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/databases/${input.event.inputConfig.databaseName}/securityAlertPolicies/${input.event.inputConfig.securityAlertPolicyName}` +
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
              state: {
                type: "string",
              },
              disabledAlerts: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              emailAddresses: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              emailAccountAdmins: {
                type: "boolean",
              },
              storageEndpoint: {
                type: "string",
              },
              storageAccountAccessKey: {
                type: "string",
              },
              retentionDays: {
                type: "integer",
              },
              creationTime: {
                type: "string",
              },
            },
            required: ["state"],
          },
        },
      },
    },
  },
};

export default ManagedDatabaseSecurityAlertPolicies_Get;
