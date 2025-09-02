import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedInstances_RefreshStatus: AppBlock = {
  name: "Managed Instances / Refresh Status",
  description: "Refresh external governance enablement status.",
  category: "Managed Instances",
  inputs: {
    default: {
      config: {
        managedInstanceName: {
          name: "Managed Instance Name",
          description: "Name of the managed instance",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/refreshExternalGovernanceStatus` +
          "?api-version=2023-08-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
              requestId: {
                type: "string",
              },
              requestType: {
                type: "string",
              },
              queuedTime: {
                type: "string",
              },
              managedInstanceName: {
                type: "string",
              },
              status: {
                type: "string",
              },
              errorMessage: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default ManagedInstances_RefreshStatus;
