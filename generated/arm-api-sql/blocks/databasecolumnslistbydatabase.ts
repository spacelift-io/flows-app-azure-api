import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DatabaseColumns_ListByDatabase: AppBlock = {
  name: "Database Columns / List By Database",
  description: "List database columns",
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
        schema: {
          name: "Schema",
          type: {
            type: "array",
          },
          required: false,
        },
        table: {
          name: "Table",
          type: {
            type: "array",
          },
          required: false,
        },
        column: {
          name: "Column",
          type: {
            type: "array",
          },
          required: false,
        },
        orderBy: {
          name: "Order By",
          type: {
            type: "array",
          },
          required: false,
        },
        $skiptoken: {
          name: "Skiptoken",
          description:
            "An opaque token that identifies a starting point in the collection.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/columns` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.schema
            ? `&schema=${input.event.inputConfig.schema}`
            : "") +
          (input.event.inputConfig.table
            ? `&table=${input.event.inputConfig.table}`
            : "") +
          (input.event.inputConfig.column
            ? `&column=${input.event.inputConfig.column}`
            : "") +
          (input.event.inputConfig.orderBy
            ? `&orderBy=${input.event.inputConfig.orderBy}`
            : "") +
          (input.event.inputConfig.$skiptoken
            ? `&$skiptoken=${input.event.inputConfig.$skiptoken}`
            : "");

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
          value: {
            type: "array",
            items: {
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default DatabaseColumns_ListByDatabase;
