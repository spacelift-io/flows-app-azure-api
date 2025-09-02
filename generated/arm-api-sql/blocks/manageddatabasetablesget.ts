import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedDatabaseTables_Get: AppBlock = {
  name: "Managed Database Tables / Get",
  description: "Get managed database table",
  category: "Managed Database Tables",
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
        schemaName: {
          name: "Schema Name",
          description: "Name of the schema",
          type: "string",
          required: true,
        },
        tableName: {
          name: "Table Name",
          description: "Name of the table",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/databases/${input.event.inputConfig.databaseName}/schemas/${input.event.inputConfig.schemaName}/tables/${input.event.inputConfig.tableName}` +
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
              temporalType: {
                type: "string",
              },
              memoryOptimized: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
  },
};

export default ManagedDatabaseTables_Get;
