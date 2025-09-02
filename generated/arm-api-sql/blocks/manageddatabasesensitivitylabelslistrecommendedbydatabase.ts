import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedDatabaseSensitivityLabels_ListRecommendedByDatabase: AppBlock = {
  name: "Managed Database Sensitivity Labels / List Recommended By Database",
  description: "Gets the sensitivity labels of a given database",
  category: "Managed Database Sensitivity Labels",
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
        $skipToken: {
          name: "Skip Token",
          type: "string",
          required: false,
        },
        includeDisabledRecommendations: {
          name: "Include Disabled Recommendations",
          description:
            "Specifies whether to include disabled recommendations or not.",
          type: "boolean",
          required: false,
        },
        $filter: {
          name: "Filter",
          description:
            "An OData filter expression that filters elements in the collection.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/databases/${input.event.inputConfig.databaseName}/recommendedSensitivityLabels` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.$skipToken
            ? `&$skipToken=${input.event.inputConfig.$skipToken}`
            : "") +
          (input.event.inputConfig.includeDisabledRecommendations
            ? `&includeDisabledRecommendations=${input.event.inputConfig.includeDisabledRecommendations}`
            : "") +
          (input.event.inputConfig.$filter
            ? `&$filter=${input.event.inputConfig.$filter}`
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
                managedBy: {
                  type: "string",
                },
                properties: {
                  type: "object",
                  properties: {
                    schemaName: {
                      type: "string",
                    },
                    tableName: {
                      type: "string",
                    },
                    columnName: {
                      type: "string",
                    },
                    labelName: {
                      type: "string",
                    },
                    labelId: {
                      type: "string",
                    },
                    informationType: {
                      type: "string",
                    },
                    informationTypeId: {
                      type: "string",
                    },
                    isDisabled: {
                      type: "boolean",
                    },
                    rank: {
                      type: "string",
                    },
                    clientClassificationSource: {
                      type: "string",
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

export default ManagedDatabaseSensitivityLabels_ListRecommendedByDatabase;
