import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CapacityReservationGroups_Update: AppBlock = {
  name: "Capacity Reservation Groups / Update",
  description:
    "The operation to update a capacity reservation group. When updating a capacity reservation group, only tags and sharing profile may be modified.",
  category: "Capacity Reservation Groups",
  inputs: {
    default: {
      config: {
        capacityReservationGroupName: {
          name: "Capacity Reservation Group Name",
          description: "Name of the capacity reservation group",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  capacityReservations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                      },
                    },
                  },
                  virtualMachinesAssociated: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  instanceView: {
                    type: "object",
                    properties: {
                      capacityReservations: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                          },
                        },
                      },
                      sharedSubscriptionIds: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                  },
                  sharingProfile: {
                    type: "object",
                    properties: {
                      subscriptionIds: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/${input.event.inputConfig.capacityReservationGroupName}` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
              capacityReservations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                  },
                },
              },
              virtualMachinesAssociated: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              instanceView: {
                type: "object",
                properties: {
                  capacityReservations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                      },
                    },
                  },
                  sharedSubscriptionIds: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
              },
              sharingProfile: {
                type: "object",
                properties: {
                  subscriptionIds: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                      },
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

export default CapacityReservationGroups_Update;
