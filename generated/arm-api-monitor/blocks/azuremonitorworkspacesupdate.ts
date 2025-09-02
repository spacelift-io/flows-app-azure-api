import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AzureMonitorWorkspaces_Update: AppBlock = {
  name: "Azure Monitor Workspaces / Update",
  description: "Updates part of an Azure Monitor Workspace",
  category: "Azure Monitor Workspaces",
  inputs: {
    default: {
      config: {
        azureMonitorWorkspaceName: {
          name: "Azure Monitor Workspace Name",
          description: "Name of the azure monitor workspace",
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
        azureMonitorWorkspaceProperties: {
          name: "Azure Monitor Workspace Properties",
          description: "The payload",
          type: {
            type: "object",
            properties: {
              tags: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody =
          input.event.inputConfig.azureMonitorWorkspaceProperties;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Monitor/accounts/${input.event.inputConfig.azureMonitorWorkspaceName}` +
          "?api-version=2023-04-03";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
          requestBody,
          undefined,
          input.event.inputConfig.isBinaryData || false,
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
          },
          etag: {
            type: "string",
          },
        },
        required: ["location"],
      },
    },
  },
};

export default AzureMonitorWorkspaces_Update;
