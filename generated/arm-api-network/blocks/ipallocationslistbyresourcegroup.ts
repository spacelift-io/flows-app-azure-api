import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const IpAllocations_ListByResourceGroup: AppBlock = {
  name: "Ip Allocations / List By Resource Group",
  description: "Gets all IpAllocations in a resource group.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/IpAllocations` +
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

export default IpAllocations_ListByResourceGroup;
