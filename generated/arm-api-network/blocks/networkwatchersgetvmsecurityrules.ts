import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkWatchers_GetVMSecurityRules: AppBlock = {
  name: "Network Watchers / Get VM Security Rules",
  description:
    "Gets the configured and effective security group rules on the specified VM.",
  category: "Network Watchers",
  inputs: {
    default: {
      config: {
        networkWatcherName: {
          name: "Network Watcher Name",
          description: "Name of the network watcher",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkWatchers/${input.event.inputConfig.networkWatcherName}/securityGroupView` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          networkInterfaces: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                securityRuleAssociations: {
                  type: "object",
                  properties: {
                    networkInterfaceAssociation: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        securityRules: {
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
                                required: [
                                  "protocol",
                                  "access",
                                  "priority",
                                  "direction",
                                ],
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
                      },
                    },
                    subnetAssociation: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        securityRules: {
                          type: "array",
                          items: {
                            type: "object",
                            additionalProperties: true,
                          },
                        },
                      },
                    },
                    defaultSecurityRules: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: true,
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
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default NetworkWatchers_GetVMSecurityRules;
