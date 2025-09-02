import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualClusters_Get: AppBlock = {
  name: "Virtual Clusters / Get",
  description: "Gets a virtual cluster.",
  category: "Virtual Clusters",
  inputs: {
    default: {
      config: {
        virtualClusterName: {
          name: "Virtual Cluster Name",
          description: "Name of the virtual cluster",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/virtualClusters/${input.event.inputConfig.virtualClusterName}` +
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
              subnetId: {
                type: "string",
              },
              version: {
                type: "string",
              },
              childResources: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
        required: ["location"],
      },
    },
  },
};

export default VirtualClusters_Get;
