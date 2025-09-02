import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NatGateways_List: AppBlock = {
  name: "Nat Gateways / List",
  description: "Gets all nat gateways in a resource group.",
  category: "Nat Gateways",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/natGateways` +
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
                sku: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                  },
                },
                properties: {
                  type: "object",
                  properties: {
                    idleTimeoutInMinutes: {
                      type: "integer",
                    },
                    publicIpAddresses: {
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
                    publicIpAddressesV6: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    publicIpPrefixes: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    publicIpPrefixesV6: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    subnets: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                    sourceVirtualNetwork: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                    resourceGuid: {
                      type: "string",
                    },
                    provisioningState: {
                      type: "string",
                    },
                  },
                },
                zones: {
                  type: "array",
                  items: {
                    type: "string",
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

export default NatGateways_List;
