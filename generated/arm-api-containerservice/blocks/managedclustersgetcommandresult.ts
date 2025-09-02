import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedClusters_GetCommandResult: AppBlock = {
  name: "Managed Clusters / Get Command Result",
  description:
    "Gets the results of a command which has been run on the Managed Cluster.",
  category: "Managed Clusters",
  inputs: {
    default: {
      config: {
        resourceName: {
          name: "Resource Name",
          description: "Name of the resource",
          type: "string",
          required: true,
        },
        commandId: {
          name: "Command ID",
          description: "Unique identifier",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/${input.event.inputConfig.resourceName}/commandResults/${input.event.inputConfig.commandId}` +
          "?api-version=2025-07-01";

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
          id: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              provisioningState: {
                type: "string",
              },
              exitCode: {
                type: "integer",
              },
              startedAt: {
                type: "string",
              },
              finishedAt: {
                type: "string",
              },
              logs: {
                type: "string",
              },
              reason: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default ManagedClusters_GetCommandResult;
