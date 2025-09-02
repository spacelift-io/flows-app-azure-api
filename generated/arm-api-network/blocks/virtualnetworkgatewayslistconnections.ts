import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGateways_ListConnections: AppBlock = {
  name: "Virtual Network Gateways / List Connections",
  description: "Gets all the connections in a virtual network gateway.",
  category: "Virtual Network Gateways",
  inputs: {
    default: {
      config: {
        virtualNetworkGatewayName: {
          name: "Virtual Network Gateway Name",
          description: "Name of the virtual network gateway",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/${input.event.inputConfig.virtualNetworkGatewayName}/connections` +
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
                    authorizationKey: {
                      type: "string",
                    },
                    virtualNetworkGateway1: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                      },
                      required: ["id"],
                    },
                    virtualNetworkGateway2: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                      required: ["id"],
                    },
                    localNetworkGateway2: {
                      type: "object",
                      properties: {
                        id: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                      required: ["id"],
                    },
                    connectionType: {
                      type: "string",
                    },
                    connectionProtocol: {
                      type: "string",
                    },
                    routingWeight: {
                      type: "integer",
                    },
                    connectionMode: {
                      type: "string",
                    },
                    sharedKey: {
                      type: "string",
                    },
                    connectionStatus: {
                      type: "string",
                    },
                    tunnelConnectionStatus: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          tunnel: {
                            type: "string",
                          },
                          connectionStatus: {
                            type: "string",
                          },
                          ingressBytesTransferred: {
                            type: "integer",
                          },
                          egressBytesTransferred: {
                            type: "integer",
                          },
                          lastConnectionEstablishedUtcTime: {
                            type: "string",
                          },
                        },
                      },
                    },
                    egressBytesTransferred: {
                      type: "integer",
                    },
                    ingressBytesTransferred: {
                      type: "integer",
                    },
                    peer: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                      },
                    },
                    enableBgp: {
                      type: "boolean",
                    },
                    gatewayCustomBgpIpAddresses: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          ipConfigurationId: {
                            type: "string",
                          },
                          customBgpIpAddress: {
                            type: "string",
                          },
                        },
                        required: ["ipConfigurationId", "customBgpIpAddress"],
                      },
                    },
                    usePolicyBasedTrafficSelectors: {
                      type: "boolean",
                    },
                    ipsecPolicies: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          saLifeTimeSeconds: {
                            type: "integer",
                          },
                          saDataSizeKilobytes: {
                            type: "integer",
                          },
                          ipsecEncryption: {
                            type: "string",
                          },
                          ipsecIntegrity: {
                            type: "string",
                          },
                          ikeEncryption: {
                            type: "string",
                          },
                          ikeIntegrity: {
                            type: "string",
                          },
                          dhGroup: {
                            type: "string",
                          },
                          pfsGroup: {
                            type: "string",
                          },
                        },
                        required: [
                          "saLifeTimeSeconds",
                          "saDataSizeKilobytes",
                          "ipsecEncryption",
                          "ipsecIntegrity",
                          "ikeEncryption",
                          "ikeIntegrity",
                          "dhGroup",
                          "pfsGroup",
                        ],
                      },
                    },
                    trafficSelectorPolicies: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          localAddressRanges: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                          remoteAddressRanges: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                          },
                        },
                        required: ["localAddressRanges", "remoteAddressRanges"],
                      },
                    },
                    resourceGuid: {
                      type: "string",
                    },
                    provisioningState: {
                      type: "string",
                    },
                    expressRouteGatewayBypass: {
                      type: "boolean",
                    },
                    enablePrivateLinkFastPath: {
                      type: "boolean",
                    },
                  },
                  required: ["virtualNetworkGateway1", "connectionType"],
                },
                etag: {
                  type: "string",
                },
              },
              required: ["properties"],
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

export default VirtualNetworkGateways_ListConnections;
