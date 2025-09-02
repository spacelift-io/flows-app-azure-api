import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ProximityPlacementGroups_Get: AppBlock = {
  name: "Proximity Placement Groups / Get",
  description: "Retrieves information about a proximity placement group .",
  category: "Proximity Placement Groups",
  inputs: {
    default: {
      config: {
        proximityPlacementGroupName: {
          name: "Proximity Placement Group Name",
          description: "Name of the proximity placement group",
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
        includeColocationStatus: {
          name: "Include Colocation Status",
          description:
            "includeColocationStatus=true enables fetching the colocation status of all the resources in the proximity placement group.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups/${input.event.inputConfig.proximityPlacementGroupName}` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.includeColocationStatus
            ? `&includeColocationStatus=${input.event.inputConfig.includeColocationStatus}`
            : "");

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
              proximityPlacementGroupType: {
                type: "string",
              },
              virtualMachines: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    colocationStatus: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                        },
                        level: {
                          type: "string",
                        },
                        displayStatus: {
                          type: "string",
                        },
                        message: {
                          type: "string",
                        },
                        time: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              virtualMachineScaleSets: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              availabilitySets: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              colocationStatus: {
                type: "object",
                properties: {
                  code: {
                    type: "object",
                    additionalProperties: true,
                  },
                  level: {
                    type: "object",
                    additionalProperties: true,
                  },
                  displayStatus: {
                    type: "object",
                    additionalProperties: true,
                  },
                  message: {
                    type: "object",
                    additionalProperties: true,
                  },
                  time: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              intent: {
                type: "object",
                properties: {
                  vmSizes: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          zones: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

export default ProximityPlacementGroups_Get;
