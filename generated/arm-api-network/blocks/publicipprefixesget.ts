import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PublicIPPrefixes_Get: AppBlock = {
  name: "Public IP Prefixes / Get",
  description:
    "Gets the specified public IP prefix in a specified resource group.",
  category: "Public IP Prefixes",
  inputs: {
    default: {
      config: {
        publicIpPrefixName: {
          name: "Public IP Prefix Name",
          description: "Name of the public ip prefix",
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
        $expand: {
          name: "Expand",
          description: "Expands referenced resources.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/${input.event.inputConfig.publicIpPrefixName}` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.$expand
            ? `&$expand=${input.event.inputConfig.$expand}`
            : "");

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
  },
};

export default PublicIPPrefixes_Get;
