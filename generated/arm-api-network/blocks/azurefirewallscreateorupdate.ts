import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AzureFirewalls_CreateOrUpdate: AppBlock = {
  name: "Azure Firewalls / Create Or Update",
  description: "Creates or updates the specified Azure Firewall.",
  category: "Azure Firewalls",
  inputs: {
    default: {
      config: {
        azureFirewallName: {
          name: "Azure Firewall Name",
          description: "Name of the azure firewall",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/azureFirewalls/${input.event.inputConfig.azureFirewallName}` +
          "?api-version=2024-10-01";

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
              applicationRuleCollections: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      type: "object",
                      properties: {
                        priority: {
                          type: "integer",
                        },
                        action: {
                          type: "object",
                          properties: {
                            type: {
                              type: "string",
                            },
                          },
                        },
                        rules: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                              },
                              description: {
                                type: "string",
                              },
                              sourceAddresses: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              protocols: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    protocolType: {
                                      type: "string",
                                    },
                                    port: {
                                      type: "integer",
                                    },
                                  },
                                },
                              },
                              targetFqdns: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              fqdnTags: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              sourceIpGroups: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                            },
                          },
                        },
                        provisioningState: {
                          type: "string",
                        },
                      },
                    },
                    name: {
                      type: "string",
                    },
                    etag: {
                      type: "string",
                    },
                  },
                },
              },
              natRuleCollections: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      type: "object",
                      properties: {
                        priority: {
                          type: "integer",
                        },
                        action: {
                          type: "object",
                          properties: {
                            type: {
                              type: "string",
                            },
                          },
                        },
                        rules: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                              },
                              description: {
                                type: "string",
                              },
                              sourceAddresses: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              destinationAddresses: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              destinationPorts: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              protocols: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              translatedAddress: {
                                type: "string",
                              },
                              translatedPort: {
                                type: "string",
                              },
                              translatedFqdn: {
                                type: "string",
                              },
                              sourceIpGroups: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                            },
                          },
                        },
                        provisioningState: {
                          type: "string",
                        },
                      },
                    },
                    name: {
                      type: "string",
                    },
                    etag: {
                      type: "string",
                    },
                  },
                },
              },
              networkRuleCollections: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      type: "object",
                      properties: {
                        priority: {
                          type: "integer",
                        },
                        action: {
                          type: "object",
                          properties: {
                            type: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                        rules: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                              },
                              description: {
                                type: "string",
                              },
                              protocols: {
                                type: "array",
                                items: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                              sourceAddresses: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              destinationAddresses: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              destinationPorts: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              destinationFqdns: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              sourceIpGroups: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              destinationIpGroups: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                            },
                          },
                        },
                        provisioningState: {
                          type: "string",
                        },
                      },
                    },
                    name: {
                      type: "string",
                    },
                    etag: {
                      type: "string",
                    },
                  },
                },
              },
              ipConfigurations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      type: "object",
                      properties: {
                        privateIPAddress: {
                          type: "string",
                        },
                        subnet: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                          },
                        },
                        publicIPAddress: {
                          type: "object",
                          properties: {
                            id: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                        provisioningState: {
                          type: "string",
                        },
                      },
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
              managementIpConfiguration: {
                type: "object",
                properties: {
                  properties: {
                    type: "object",
                    additionalProperties: true,
                  },
                  name: {
                    type: "object",
                    additionalProperties: true,
                  },
                  etag: {
                    type: "object",
                    additionalProperties: true,
                  },
                  type: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              provisioningState: {
                type: "string",
              },
              threatIntelMode: {
                type: "string",
              },
              virtualHub: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              firewallPolicy: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              hubIPAddresses: {
                type: "object",
                properties: {
                  publicIPs: {
                    type: "object",
                    properties: {
                      addresses: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            address: {
                              type: "string",
                            },
                          },
                        },
                      },
                      count: {
                        type: "integer",
                      },
                    },
                  },
                  privateIPAddress: {
                    type: "string",
                  },
                },
              },
              ipGroups: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
                    changeNumber: {
                      type: "string",
                    },
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
                },
              },
              additionalProperties: {
                type: "object",
                additionalProperties: true,
              },
              autoscaleConfiguration: {
                type: "object",
                properties: {
                  minCapacity: {
                    type: "integer",
                  },
                  maxCapacity: {
                    type: "integer",
                  },
                },
              },
            },
          },
          extendedLocation: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              type: {
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
  },
};

export default AzureFirewalls_CreateOrUpdate;
