import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CapacityReservations_CreateOrUpdate: AppBlock = {
  name: "Capacity Reservations / Create Or Update",
  description:
    "The operation to create or update a capacity reservation. Please note some properties can be set only during capacity reservation creation. Please refer to https://aka.ms/CapacityReservation for more details.",
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
        capacityReservationName: {
          name: "Capacity Reservation Name",
          description: "Name of the capacity reservation",
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
                  reservationId: {
                    type: "string",
                  },
                  platformFaultDomainCount: {
                    type: "number",
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
                            type: "number",
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
                    type: "number",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/capacityReservationGroups/${input.event.inputConfig.capacityReservationGroupName}/capacityReservations/${input.event.inputConfig.capacityReservationName}` +
          "?api-version=2024-11-01";

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
  },
};

export default CapacityReservations_CreateOrUpdate;
