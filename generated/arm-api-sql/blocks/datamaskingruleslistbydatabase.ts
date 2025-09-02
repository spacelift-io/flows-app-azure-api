import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DataMaskingRules_ListByDatabase: AppBlock = {
  name: "Data Masking Rules / List By Database",
  description: "Gets a list of database data masking rules.",
  category: "Data Masking Rules",
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
        dataMaskingPolicyName: {
          name: "Data Masking Policy Name",
          description: "Name of the data masking policy",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/dataMaskingPolicies/${input.event.inputConfig.dataMaskingPolicyName}/rules` +
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                location: {
                  type: "string",
                },
                kind: {
                  type: "string",
                },
                properties: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    ruleState: {
                      type: "string",
                    },
                    schemaName: {
                      type: "string",
                    },
                    tableName: {
                      type: "string",
                    },
                    columnName: {
                      type: "string",
                    },
                    aliasName: {
                      type: "string",
                    },
                    maskingFunction: {
                      type: "string",
                    },
                    numberFrom: {
                      type: "string",
                    },
                    numberTo: {
                      type: "string",
                    },
                    prefixSize: {
                      type: "string",
                    },
                    suffixSize: {
                      type: "string",
                    },
                    replacementString: {
                      type: "string",
                    },
                  },
                  required: [
                    "schemaName",
                    "tableName",
                    "columnName",
                    "maskingFunction",
                  ],
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

export default DataMaskingRules_ListByDatabase;
