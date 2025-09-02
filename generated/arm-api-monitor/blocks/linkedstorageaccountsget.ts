import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LinkedStorageAccounts_Get: AppBlock = {
  name: "Linked Storage Accounts / Get",
  description:
    "Gets all linked storage account of a specific data source type associated with the specified workspace.",
  category: "Linked Storage Accounts",
  inputs: {
    default: {
      config: {
        workspaceName: {
          name: "Workspace Name",
          description: "Name of the workspace",
          type: "string",
          required: true,
        },
        dataSourceType: {
          name: "Data Source Type",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourcegroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/${input.event.inputConfig.workspaceName}/linkedStorageAccounts/${input.event.inputConfig.dataSourceType}` +
          "?api-version=2025-02-01";

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
              dataSourceType: {
                type: "string",
              },
              storageAccountIds: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
        required: ["properties"],
      },
    },
  },
};

export default LinkedStorageAccounts_Get;
