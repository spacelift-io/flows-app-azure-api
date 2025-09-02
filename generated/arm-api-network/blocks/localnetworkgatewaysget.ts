import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LocalNetworkGateways_Get: AppBlock = {
  name: "Local Network Gateways / Get",
  description: "Gets the specified local network gateway in a resource group.",
  category: "Local Network Gateways",
  inputs: {
    default: {
      config: {
        localNetworkGatewayName: {
          name: "Local Network Gateway Name",
          description: "Name of the local network gateway",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/localNetworkGateways/${input.event.inputConfig.localNetworkGatewayName}` +
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
          properties: {
            type: "object",
            properties: {
              localNetworkAddressSpace: {
                type: "object",
                properties: {
                  addressPrefixes: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  ipamPoolPrefixAllocations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        pool: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                          },
                        },
                        numberOfIpAddresses: {
                          type: "string",
                        },
                        allocatedAddressPrefixes: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                },
              },
              gatewayIpAddress: {
                type: "string",
              },
              fqdn: {
                type: "string",
              },
              bgpSettings: {
                type: "object",
                properties: {
                  asn: {
                    type: "integer",
                  },
                  bgpPeeringAddress: {
                    type: "string",
                  },
                  peerWeight: {
                    type: "integer",
                  },
                  bgpPeeringAddresses: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        ipconfigurationId: {
                          type: "string",
                        },
                        defaultBgpIpAddresses: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        customBgpIpAddresses: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        tunnelIpAddresses: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                      },
                    },
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
          etag: {
            type: "string",
          },
        },
        required: ["properties"],
      },
    },
  },
};

export default LocalNetworkGateways_Get;
