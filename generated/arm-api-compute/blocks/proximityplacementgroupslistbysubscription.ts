import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ProximityPlacementGroups_ListBySubscription: AppBlock = {
  name: "Proximity Placement Groups / List By Subscription",
  description: "Lists all proximity placement groups in a subscription.",
  category: "Proximity Placement Groups",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/proximityPlacementGroups` +
          "?api-version=2024-11-01";

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
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default ProximityPlacementGroups_ListBySubscription;
