import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DedicatedHostGroups_ListBySubscription: AppBlock = {
  name: "Dedicated Host Groups / List By Subscription",
  description:
    "Lists all of the dedicated host groups in the subscription. Use the nextLink property in the response to get the next page of dedicated host groups.",
  category: "Dedicated Host Groups",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/hostGroups` +
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
                    platformFaultDomainCount: {
                      type: "integer",
                    },
                    hosts: {
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
                    instanceView: {
                      type: "object",
                      properties: {
                        hosts: {
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
                      },
                    },
                    supportAutomaticPlacement: {
                      type: "boolean",
                    },
                    additionalCapabilities: {
                      type: "object",
                      properties: {
                        ultraSSDEnabled: {
                          type: "boolean",
                        },
                      },
                    },
                  },
                  required: ["platformFaultDomainCount"],
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

export default DedicatedHostGroups_ListBySubscription;
