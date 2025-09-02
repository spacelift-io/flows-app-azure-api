import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VpnLinkConnections_SetOrInitDefaultSharedKey: AppBlock = {
  name: "Vpn Link Connections / Set Or Init Default Shared Key",
  description:
    "Sets or auto generates the shared key based on the user input. If users give a shared key value, it does the set operation. If key length is given, the operation creates a random key of the pre-defined length.",
  category: "Vpn Link Connections",
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
        ConnectionSharedKeyParameters: {
          name: "Connection Shared Key Parameters",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  sharedKey: {
                    type: "string",
                  },
                  sharedKeyLength: {
                    type: "number",
                  },
                  provisioningState: {
                    type: "string",
                  },
                },
              },
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              type: {
                type: "string",
              },
            },
          },
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
        const requestBody =
          input.event.inputConfig.ConnectionSharedKeyParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/vpnGateways/${input.event.inputConfig.gatewayName}/vpnConnections/${input.event.inputConfig.connectionName}/vpnLinkConnections/${input.event.inputConfig.linkConnectionName}/sharedKeys/default` +
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
              sharedKey: {
                type: "string",
              },
              sharedKeyLength: {
                type: "integer",
              },
              provisioningState: {
                type: "string",
              },
            },
          },
          id: {
            type: "string",
          },
          name: {
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

export default VpnLinkConnections_SetOrInitDefaultSharedKey;
