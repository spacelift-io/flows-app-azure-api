import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkPeerings_CreateOrUpdate: AppBlock = {
  name: "Virtual Network Peerings / Create Or Update",
  description: "Creates or updates a peering in the specified virtual network.",
  category: "Virtual Network Peerings",
  inputs: {
    default: {
      config: {
        virtualNetworkName: {
          name: "Virtual Network Name",
          description: "Name of the virtual network",
          type: "string",
          required: true,
        },
        virtualNetworkPeeringName: {
          name: "Virtual Network Peering Name",
          description: "Name of the virtual network peering",
          type: "string",
          required: true,
        },
        VirtualNetworkPeeringParameters: {
          name: "Virtual Network Peering Parameters",
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
        syncRemoteAddressSpace: {
          name: "Sync Remote Address Space",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody =
          input.event.inputConfig.VirtualNetworkPeeringParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworks/${input.event.inputConfig.virtualNetworkName}/virtualNetworkPeerings/${input.event.inputConfig.virtualNetworkPeeringName}` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.syncRemoteAddressSpace
            ? `&syncRemoteAddressSpace=${input.event.inputConfig.syncRemoteAddressSpace}`
            : "");

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
              allowVirtualNetworkAccess: {
                type: "boolean",
              },
              allowForwardedTraffic: {
                type: "boolean",
              },
              allowGatewayTransit: {
                type: "boolean",
              },
              useRemoteGateways: {
                type: "boolean",
              },
              remoteVirtualNetwork: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
              localAddressSpace: {
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
              localVirtualNetworkAddressSpace: {
                type: "object",
                properties: {
                  addressPrefixes: {
                    type: "object",
                    additionalProperties: true,
                  },
                  ipamPoolPrefixAllocations: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              remoteAddressSpace: {
                type: "object",
                properties: {
                  addressPrefixes: {
                    type: "object",
                    additionalProperties: true,
                  },
                  ipamPoolPrefixAllocations: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              remoteVirtualNetworkAddressSpace: {
                type: "object",
                properties: {
                  addressPrefixes: {
                    type: "object",
                    additionalProperties: true,
                  },
                  ipamPoolPrefixAllocations: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              remoteBgpCommunities: {
                type: "object",
                properties: {
                  virtualNetworkCommunity: {
                    type: "string",
                  },
                  regionalCommunity: {
                    type: "string",
                  },
                },
                required: ["virtualNetworkCommunity"],
              },
              remoteVirtualNetworkEncryption: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  enforcement: {
                    type: "string",
                  },
                },
                required: ["enabled"],
              },
              peeringState: {
                type: "string",
              },
              peeringSyncLevel: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
              doNotVerifyRemoteGateways: {
                type: "boolean",
              },
              resourceGuid: {
                type: "string",
              },
              peerCompleteVnets: {
                type: "boolean",
              },
              enableOnlyIPv6Peering: {
                type: "boolean",
              },
              localSubnetNames: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              remoteSubnetNames: {
                type: "array",
                items: {
                  type: "string",
                },
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
  },
};

export default VirtualNetworkPeerings_CreateOrUpdate;
