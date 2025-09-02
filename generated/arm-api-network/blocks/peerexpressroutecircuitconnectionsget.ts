import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PeerExpressRouteCircuitConnections_Get: AppBlock = {
  name: "Peer Express Route Circuit Connections / Get",
  description:
    "Gets the specified Peer Express Route Circuit Connection from the specified express route circuit.",
  category: "Peer Express Route Circuit Connections",
  inputs: {
    default: {
      config: {
        circuitName: {
          name: "Circuit Name",
          description: "Name of the circuit",
          type: "string",
          required: true,
        },
        peeringName: {
          name: "Peering Name",
          description: "Name of the peering",
          type: "string",
          required: true,
        },
        connectionName: {
          name: "Connection Name",
          description: "Name of the connection",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/${input.event.inputConfig.circuitName}/peerings/${input.event.inputConfig.peeringName}/peerConnections/${input.event.inputConfig.connectionName}` +
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
              expressRouteCircuitPeering: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
              peerExpressRouteCircuitPeering: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              addressPrefix: {
                type: "string",
              },
              circuitConnectionStatus: {
                type: "string",
              },
              connectionName: {
                type: "string",
              },
              authResourceGuid: {
                type: "string",
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
  },
};

export default PeerExpressRouteCircuitConnections_Get;
