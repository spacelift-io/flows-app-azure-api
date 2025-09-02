import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LocalNetworkGateways_UpdateTags: AppBlock = {
  name: "Local Network Gateways / Update Tags",
  description: "Updates a local network gateway tags.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/localNetworkGateways/${input.event.inputConfig.localNetworkGatewayName}` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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

export default LocalNetworkGateways_UpdateTags;
