import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Snapshots_ListByResourceGroup: AppBlock = {
  name: "Snapshots / List By Resource Group",
  description:
    "Lists snapshots in the specified subscription and resource group.",
  category: "Snapshots",
  inputs: {
    default: {
      config: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/snapshots` +
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
          value: {
            type: "array",
            items: {
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Snapshots_ListByResourceGroup;
