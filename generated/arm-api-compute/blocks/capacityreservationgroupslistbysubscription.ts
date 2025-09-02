import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CapacityReservationGroups_ListBySubscription: AppBlock = {
  name: "Capacity Reservation Groups / List By Subscription",
  description:
    "Lists all of the capacity reservation groups in the subscription. Use the nextLink property in the response to get the next page of capacity reservation groups.",
  category: "Capacity Reservation Groups",
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
        $expand: {
          name: "Expand",
          description:
            "The expand expression to apply on the operation. Based on the expand param(s) specified we return Virtual Machine or ScaleSet VM Instance or both resource Ids which are associated to capacity reservation group in the response.",
          type: "string",
          required: false,
        },
        resourceIdsOnly: {
          name: "Resource Ids Only",
          description:
            "The query option to fetch Capacity Reservation Group Resource Ids. <br> 'CreatedInSubscription' enables fetching Resource Ids for all capacity reservation group resources created in the subscription. <br> 'SharedWithSubscription' enables fetching Resource Ids for all capacity reservation group resources shared with the subscription. <br> 'All' enables fetching Resource Ids for all capacity reservation group resources shared with the subscription and created in the subscription.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/capacityReservationGroups` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.$expand
            ? `&$expand=${input.event.inputConfig.$expand}`
            : "") +
          (input.event.inputConfig.resourceIdsOnly
            ? `&resourceIdsOnly=${input.event.inputConfig.resourceIdsOnly}`
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
          value: {
            type: "array",
            items: {
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
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default CapacityReservationGroups_ListBySubscription;
