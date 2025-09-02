import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PublicIPPrefixes_List: AppBlock = {
  name: "Public IP Prefixes / List",
  description: "Gets all public IP prefixes in a resource group.",
  category: "Public IP Prefixes",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes` +
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
                properties: {
                  type: "object",
                  properties: {
                    publicIPAddressVersion: {
                      type: "string",
                    },
                    ipTags: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          ipTagType: {
                            type: "string",
                          },
                          tag: {
                            type: "string",
                          },
                        },
                      },
                    },
                    prefixLength: {
                      type: "integer",
                    },
                    ipPrefix: {
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
                    loadBalancerFrontendIpConfiguration: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                      },
                    },
                    customIPPrefix: {
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
                    natGateway: {
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
                                    type: "object",
                                    additionalProperties: true,
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
                },
                etag: {
                  type: "string",
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
      },
    },
  },
};

export default PublicIPPrefixes_List;
