import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Machines_List: AppBlock = {
  name: "Machines / List",
  description: "Gets a list of machines in the specified agent pool.",
  category: "Machines",
  inputs: {
    default: {
      config: {
        resourceName: {
          name: "Resource Name",
          description: "Name of the resource",
          type: "string",
          required: true,
        },
        agentPoolName: {
          name: "Agent Pool Name",
          description: "Name of the agent pool",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/${input.event.inputConfig.resourceName}/agentPools/${input.event.inputConfig.agentPoolName}/machines` +
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
          nextLink: {
            type: "string",
          },
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                zones: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                properties: {
                  type: "object",
                  properties: {
                    network: {
                      type: "object",
                      properties: {
                        ipAddresses: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              family: {
                                type: "string",
                              },
                              ip: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                    },
                    resourceId: {
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
};

export default Machines_List;
