import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DefaultSecurityRules_List: AppBlock = {
  name: "Default Security Rules / List",
  description: "Gets all default security rules in a network security group.",
  category: "Default Security Rules",
  inputs: {
    default: {
      config: {
        networkSecurityGroupName: {
          name: "Network Security Group Name",
          description: "Name of the network security group",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkSecurityGroups/${input.event.inputConfig.networkSecurityGroupName}/defaultSecurityRules` +
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
                    description: {
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
                    sourceAddressPrefix: {
                      type: "string",
                    },
                    sourceAddressPrefixes: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    sourceApplicationSecurityGroups: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          properties: {
                            type: "object",
                            properties: {
                              resourceGuid: {
                                type: "string",
                              },
                              provisioningState: {
                                type: "string",
                              },
                            },
                          },
                          etag: {
                            type: "string",
                          },
                        },
                      },
                    },
                    destinationAddressPrefix: {
                      type: "string",
                    },
                    destinationAddressPrefixes: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    destinationApplicationSecurityGroups: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
                      },
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
                    access: {
                      type: "string",
                    },
                    priority: {
                      type: "integer",
                    },
                    direction: {
                      type: "string",
                    },
                    provisioningState: {
                      type: "string",
                    },
                  },
                  required: ["protocol", "access", "priority", "direction"],
                },
                name: {
                  type: "string",
                },
                etag: {
                  type: "string",
                },
                type: {
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

export default DefaultSecurityRules_List;
