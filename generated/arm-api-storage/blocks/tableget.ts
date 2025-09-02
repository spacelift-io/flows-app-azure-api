import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Table_Get: AppBlock = {
  name: "Table / Get",
  description:
    "Gets the table with the specified table name, under the specified account if it exists.",
  category: "Table",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/tableServices/default/tables/${input.event.inputConfig.tableName}` +
          "?api-version=2025-01-01";

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
              tableName: {
                type: "string",
              },
              signedIdentifiers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    accessPolicy: {
                      type: "object",
                      properties: {
                        startTime: {
                          type: "string",
                        },
                        expiryTime: {
                          type: "string",
                        },
                        permission: {
                          type: "string",
                        },
                      },
                      required: ["permission"],
                    },
                  },
                  required: ["id"],
                },
              },
            },
          },
        },
      },
    },
  },
};

export default Table_Get;
