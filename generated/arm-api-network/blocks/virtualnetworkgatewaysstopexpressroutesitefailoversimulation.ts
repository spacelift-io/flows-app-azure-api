import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGateways_StopExpressRouteSiteFailoverSimulation: AppBlock =
  {
    name: "Virtual Network Gateways / Stop Express Route Site Failover Simulation",
    description:
      "This operation stops failover simulation on the gateway for the specified peering location",
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
          stopParameters: {
            name: "Stop Parameters",
            type: {
              type: "object",
              properties: {
                peeringLocation: {
                  type: "string",
                },
                wasSimulationSuccessful: {
                  type: "boolean",
                },
                details: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      failoverConnectionName: {
                        type: "string",
                      },
                      failoverLocation: {
                        type: "string",
                      },
                      isVerified: {
                        type: "boolean",
                      },
                    },
                  },
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
          const requestBody = input.event.inputConfig.stopParameters;

          const url =
            `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/${input.event.inputConfig.virtualNetworkGatewayName}/stopSiteFailoverTest` +
            "?api-version=2024-10-01";

          const result = await makeAzureRequest(
            input,
            url,
            "POST",
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
          type: "string",
        },
      },
    },
  };

export default VirtualNetworkGateways_StopExpressRouteSiteFailoverSimulation;
