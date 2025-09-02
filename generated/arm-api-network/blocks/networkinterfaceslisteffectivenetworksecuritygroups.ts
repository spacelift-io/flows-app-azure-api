import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkInterfaces_ListEffectiveNetworkSecurityGroups: AppBlock = {
  name: "Network Interfaces / List Effective Network Security Groups",
  description:
    "Gets all network security groups applied to a network interface.",
  category: "Network Interfaces",
  inputs: {
    default: {
      config: {
        networkInterfaceName: {
          name: "Network Interface Name",
          description: "Name of the network interface",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkInterfaces/${input.event.inputConfig.networkInterfaceName}/effectiveNetworkSecurityGroups` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
                networkSecurityGroup: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                  },
                },
                association: {
                  type: "object",
                  properties: {
                    networkManager: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                    subnet: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                    networkInterface: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                  },
                },
                effectiveSecurityRules: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                      },
                      protocol: {
                        type: "string",
                      },
                      sourcePortRange: {
                        type: "string",
                      },
                      destinationPortRange: {
                        type: "string",
                      },
                      sourcePortRanges: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      destinationPortRanges: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      sourceAddressPrefix: {
                        type: "string",
                      },
                      destinationAddressPrefix: {
                        type: "string",
                      },
                      sourceAddressPrefixes: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      destinationAddressPrefixes: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      expandedSourceAddressPrefix: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      expandedDestinationAddressPrefix: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      access: {
                        type: "string",
                      },
                      priority: {
                        type: "integer",
                      },
                      direction: {
                        type: "string",
                      },
                    },
                  },
                },
                tagMap: {
                  type: "string",
                  additionalProperties: true,
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

export default NetworkInterfaces_ListEffectiveNetworkSecurityGroups;
