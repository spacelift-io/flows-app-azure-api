import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedClusters_GetMeshRevisionProfile: AppBlock = {
  name: "Managed Clusters / Get Mesh Revision Profile",
  description:
    "Contains extra metadata on the revision, including supported revisions, cluster compatibility and available upgrades",
  category: "Managed Clusters",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        mode: {
          name: "Mode",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.ContainerService/locations/${input.event.inputConfig.location}/meshRevisionProfiles/${input.event.inputConfig.mode}` +
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
          properties: {
            type: "object",
            properties: {
              meshRevisions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    revision: {
                      type: "string",
                    },
                    upgrades: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    compatibleWith: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                          versions: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default ManagedClusters_GetMeshRevisionProfile;
