import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedClusters_ListClusterAdminCredentials: AppBlock = {
  name: "Managed Clusters / List Cluster Admin Credentials",
  description: "Lists the admin credentials of a managed cluster.",
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
        server_fqdn: {
          name: "Server Fqdn",
          description: "server fqdn type for credentials to be returned",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/${input.event.inputConfig.resourceName}/listClusterAdminCredential` +
          "?api-version=2025-07-01" +
          (input.event.inputConfig.server_fqdn
            ? `&server-fqdn=${input.event.inputConfig.server_fqdn}`
            : "");

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
          kubeconfigs: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                value: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default ManagedClusters_ListClusterAdminCredentials;
