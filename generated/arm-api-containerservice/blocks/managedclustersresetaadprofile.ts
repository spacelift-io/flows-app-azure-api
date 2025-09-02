import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedClusters_ResetAADProfile: AppBlock = {
  name: "Managed Clusters / Reset AAD Profile",
  description:
    "**WARNING**: This API will be deprecated. Please see [AKS-managed Azure Active Directory integration](https://aka.ms/aks-managed-aad) to update your cluster with AKS-managed Azure AD.",
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
        parameters: {
          name: "Parameters",
          description: "The AAD profile to set on the Managed Cluster",
          type: {
            type: "object",
            properties: {
              managed: {
                type: "boolean",
              },
              enableAzureRBAC: {
                type: "boolean",
              },
              adminGroupObjectIDs: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              clientAppID: {
                type: "string",
              },
              serverAppID: {
                type: "string",
              },
              serverAppSecret: {
                type: "string",
              },
              tenantID: {
                type: "string",
              },
            },
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/${input.event.inputConfig.resourceName}/resetAADProfile` +
          "?api-version=2025-07-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
        additionalProperties: true,
      },
    },
  },
};

export default ManagedClusters_ResetAADProfile;
