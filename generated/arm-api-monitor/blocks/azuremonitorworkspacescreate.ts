import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AzureMonitorWorkspaces_Create: AppBlock = {
  name: "Azure Monitor Workspaces / Create",
  description: "Creates or updates an Azure Monitor Workspace",
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
        azureMonitorWorkspaceProperties: {
          name: "Azure Monitor Workspace Properties",
          description:
            "Properties that need to be specified to create a new Azure Monitor Workspace",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "string",
              },
              etag: {
                type: "string",
              },
            },
            required: ["location"],
          },
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
        const requestBody =
          input.event.inputConfig.azureMonitorWorkspaceProperties;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Monitor/accounts/${input.event.inputConfig.azureMonitorWorkspaceName}` +
          "?api-version=2023-04-03";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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

export default AzureMonitorWorkspaces_Create;
