import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedClusters_ListKubernetesVersions: AppBlock = {
  name: "Managed Clusters / List Kubernetes Versions",
  description:
    "Contains extra metadata on the version, including supported patch versions, capabilities, available upgrades, and details on preview status of the version",
  category: "Managed Clusters",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.ContainerService/locations/${input.event.inputConfig.location}/kubernetesVersions` +
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
          values: {
            type: "array",
            items: {
              type: "object",
              properties: {
                version: {
                  type: "string",
                },
                capabilities: {
                  type: "object",
                  properties: {
                    supportPlan: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
                isDefault: {
                  type: "boolean",
                },
                isPreview: {
                  type: "boolean",
                },
                patchVersions: {
                  type: "object",
                  additionalProperties: true,
                },
              },
            },
          },
        },
      },
    },
  },
};

export default ManagedClusters_ListKubernetesVersions;
