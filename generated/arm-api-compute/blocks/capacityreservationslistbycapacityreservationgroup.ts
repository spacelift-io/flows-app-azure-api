import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CapacityReservations_ListByCapacityReservationGroup: AppBlock = {
  name: "Capacity Reservations / List By Capacity Reservation Group",
  description:
    "Lists all of the capacity reservations in the specified capacity reservation group. Use the nextLink property in the response to get the next page of capacity reservations.",
  category: "Capacity Reservations",
  inputs: {
    default: {
      config: {
        capacityReservationGroupName: {
          name: "Capacity Reservation Group Name",
          description: "Name of the capacity reservation group",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/${input.event.inputConfig.capacityReservationGroupName}/capacityReservations` +
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
                    reservationId: {
                      type: "string",
                    },
                    platformFaultDomainCount: {
                      type: "integer",
                    },
                    virtualMachinesAssociated: {
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
                    provisioningTime: {
                      type: "string",
                    },
                    provisioningState: {
                      type: "string",
                    },
                    instanceView: {
                      type: "object",
                      properties: {
                        utilizationInfo: {
                          type: "object",
                          properties: {
                            currentCapacity: {
                              type: "integer",
                            },
                            virtualMachinesAllocated: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                          },
                        },
                        statuses: {
                          type: "array",
                          items: {
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
                    timeCreated: {
                      type: "string",
                    },
                  },
                },
                sku: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    tier: {
                      type: "string",
                    },
                    capacity: {
                      type: "integer",
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
              required: ["sku"],
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

export default CapacityReservations_ListByCapacityReservationGroup;
