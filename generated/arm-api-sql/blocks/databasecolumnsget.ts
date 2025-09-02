import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DatabaseColumns_Get: AppBlock = {
  name: "Database Columns / Get",
  description: "Get database column",
  category: "Database Columns",
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
        columnName: {
          name: "Column Name",
          description: "Name of the column",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/schemas/${input.event.inputConfig.schemaName}/tables/${input.event.inputConfig.tableName}/columns/${input.event.inputConfig.columnName}` +
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
              columnType: {
                type: "string",
              },
              temporalType: {
                type: "string",
              },
              memoryOptimized: {
                type: "boolean",
              },
              isComputed: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
  },
};

export default DatabaseColumns_Get;
