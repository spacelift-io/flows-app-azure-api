import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Snapshots_List: AppBlock = {
  name: "Snapshots / List",
  description: "Gets a list of snapshots in the specified subscription.",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.ContainerService/snapshots` +
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

export default Snapshots_List;
