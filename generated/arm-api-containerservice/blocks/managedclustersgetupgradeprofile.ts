import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedClusters_GetUpgradeProfile: AppBlock = {
  name: "Managed Clusters / Get Upgrade Profile",
  description: "Gets the upgrade profile of a managed cluster.",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/${input.event.inputConfig.resourceName}/upgradeProfiles/default` +
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
          name: {
            type: "string",
          },
          type: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              controlPlaneProfile: {
                type: "object",
                properties: {
                  kubernetesVersion: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                  osType: {
                    type: "string",
                  },
                  upgrades: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        kubernetesVersion: {
                          type: "string",
                        },
                        isPreview: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                },
                required: ["kubernetesVersion", "osType"],
              },
              agentPoolProfiles: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    kubernetesVersion: {
                      type: "object",
                      additionalProperties: true,
                    },
                    name: {
                      type: "object",
                      additionalProperties: true,
                    },
                    osType: {
                      type: "object",
                      additionalProperties: true,
                    },
                    upgrades: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  required: ["kubernetesVersion", "osType"],
                },
              },
            },
            required: ["controlPlaneProfile", "agentPoolProfiles"],
          },
        },
        required: ["properties"],
      },
    },
  },
};

export default ManagedClusters_GetUpgradeProfile;
