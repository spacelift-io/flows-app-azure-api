import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FleetUpdateStrategies_Get: AppBlock = {
  name: "Fleet Update Strategies / Get",
  description: "Get a FleetUpdateStrategy",
  category: "Fleet Update Strategies",
  inputs: {
    default: {
      config: {
        fleetName: {
          name: "Fleet Name",
          description: "Name of the fleet",
          type: "string",
          required: true,
        },
        updateStrategyName: {
          name: "Update Strategy Name",
          description: "Name of the update strategy",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/fleets/${input.event.inputConfig.fleetName}/updateStrategies/${input.event.inputConfig.updateStrategyName}` +
          "?api-version=2025-03-01";

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
              provisioningState: {
                type: "string",
              },
              strategy: {
                type: "object",
                properties: {
                  stages: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        groups: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                              },
                            },
                            required: ["name"],
                          },
                        },
                        afterStageWaitInSeconds: {
                          type: "integer",
                        },
                      },
                      required: ["name"],
                    },
                  },
                },
                required: ["stages"],
              },
            },
            required: ["strategy"],
          },
          eTag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default FleetUpdateStrategies_Get;
