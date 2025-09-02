import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Snapshots_CreateOrUpdate: AppBlock = {
  name: "Snapshots / Create Or Update",
  description: "Creates or updates a snapshot.",
  category: "Snapshots",
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
          description: "The snapshot to create or update.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  creationData: {
                    type: "object",
                    properties: {
                      sourceResourceId: {
                        type: "string",
                      },
                    },
                  },
                  snapshotType: {
                    type: "string",
                  },
                  kubernetesVersion: {
                    type: "string",
                  },
                  nodeImageVersion: {
                    type: "string",
                  },
                  osType: {
                    type: "string",
                  },
                  osSku: {
                    type: "string",
                  },
                  vmSize: {
                    type: "string",
                  },
                  enableFIPS: {
                    type: "boolean",
                  },
                },
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/snapshots/${input.event.inputConfig.resourceName}` +
          "?api-version=2025-07-01";

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
            properties: {
              creationData: {
                type: "object",
                properties: {
                  sourceResourceId: {
                    type: "string",
                  },
                },
              },
              snapshotType: {
                type: "string",
              },
              kubernetesVersion: {
                type: "string",
              },
              nodeImageVersion: {
                type: "string",
              },
              osType: {
                type: "string",
              },
              osSku: {
                type: "string",
              },
              vmSize: {
                type: "string",
              },
              enableFIPS: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
  },
};

export default Snapshots_CreateOrUpdate;
