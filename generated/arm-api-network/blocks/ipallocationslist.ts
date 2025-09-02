import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const IpAllocations_List: AppBlock = {
  name: "Ip Allocations / List",
  description: "Gets all IpAllocations in a subscription.",
  category: "Ip Allocations",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/IpAllocations` +
          "?api-version=2024-10-01";

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
                    subnet: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                      },
                    },
                    virtualNetwork: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                    type: {
                      type: "string",
                    },
                    prefix: {
                      type: "string",
                    },
                    prefixLength: {
                      type: "integer",
                    },
                    prefixType: {
                      type: "string",
                    },
                    ipamAllocationId: {
                      type: "string",
                    },
                    allocationTags: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
                etag: {
                  type: "string",
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

export default IpAllocations_List;
