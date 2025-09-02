import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AzureFirewalls_ListAll: AppBlock = {
  name: "Azure Firewalls / List All",
  description: "Gets all the Azure Firewalls in a subscription.",
  category: "Azure Firewalls",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/azureFirewalls` +
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default AzureFirewalls_ListAll;
