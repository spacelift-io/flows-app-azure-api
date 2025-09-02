import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PublicIPPrefixes_ListAll: AppBlock = {
  name: "Public IP Prefixes / List All",
  description: "Gets all the public IP prefixes in a subscription.",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/publicIPPrefixes` +
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

export default PublicIPPrefixes_ListAll;
