import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VpnSiteLinkConnections_Get: AppBlock = {
  name: "Vpn Site Link Connections / Get",
  description: "Retrieves the details of a vpn site link connection.",
  category: "Vpn Site Link Connections",
  inputs: {
    default: {
      config: {
        gatewayName: {
          name: "Gateway Name",
          description: "Name of the gateway",
          type: "string",
          required: true,
        },
        connectionName: {
          name: "Connection Name",
          description: "Name of the connection",
          type: "string",
          required: true,
        },
        linkConnectionName: {
          name: "Link Connection Name",
          description: "Name of the link connection",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/vpnGateways/${input.event.inputConfig.gatewayName}/vpnConnections/${input.event.inputConfig.connectionName}/vpnLinkConnections/${input.event.inputConfig.linkConnectionName}` +
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
              vpnSiteLink: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
              routingWeight: {
                type: "integer",
              },
              vpnLinkConnectionMode: {
                type: "string",
              },
              connectionStatus: {
                type: "string",
              },
              vpnConnectionProtocolType: {
                type: "string",
              },
              ingressBytesTransferred: {
                type: "integer",
              },
              egressBytesTransferred: {
                type: "integer",
              },
              connectionBandwidth: {
                type: "integer",
              },
              sharedKey: {
                type: "string",
              },
              enableBgp: {
                type: "boolean",
              },
              vpnGatewayCustomBgpAddresses: {
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
              enableRateLimiting: {
                type: "boolean",
              },
              useLocalAzureIpAddress: {
                type: "boolean",
              },
              provisioningState: {
                type: "string",
              },
              ingressNatRules: {
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
              egressNatRules: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              dpdTimeoutSeconds: {
                type: "integer",
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

export default VpnSiteLinkConnections_Get;
