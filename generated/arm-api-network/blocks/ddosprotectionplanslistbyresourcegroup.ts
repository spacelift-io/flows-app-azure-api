import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DdosProtectionPlans_ListByResourceGroup: AppBlock = {
  name: "Ddos Protection Plans / List By Resource Group",
  description: "Gets all the DDoS protection plans in a resource group.",
  category: "Ddos Protection Plans",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/ddosProtectionPlans` +
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
                id: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                location: {
                  type: "string",
                },
                tags: {
                  type: "object",
                  additionalProperties: true,
                },
                properties: {
                  type: "object",
                  properties: {
                    resourceGuid: {
                      type: "string",
                    },
                    provisioningState: {
                      type: "string",
                    },
                    publicIPAddresses: {
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
                    virtualNetworks: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
                      },
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

export default DdosProtectionPlans_ListByResourceGroup;
