import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGateways_GetFailoverSingleTestDetails: AppBlock = {
  name: "Virtual Network Gateways / Get Failover Single Test Details",
  description:
    "This operation retrieves the details of a particular failover test performed on the gateway based on the test Guid",
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
        peeringLocation: {
          name: "Peering Location",
          description: "Peering location of the test",
          type: "string",
          required: true,
        },
        failoverTestId: {
          name: "Failover Test ID",
          description: "The unique Guid value which identifies the test",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/${input.event.inputConfig.virtualNetworkGatewayName}/getFailoverSingleTestDetails` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.peeringLocation
            ? `&peeringLocation=${input.event.inputConfig.peeringLocation}`
            : "") +
          (input.event.inputConfig.failoverTestId
            ? `&failoverTestId=${input.event.inputConfig.failoverTestId}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
        type: "array",
        items: {
          type: "object",
          properties: {
            peeringLocation: {
              type: "string",
            },
            status: {
              type: "string",
            },
            startTimeUtc: {
              type: "string",
            },
            endTimeUtc: {
              type: "string",
            },
            redundantRoutes: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  peeringLocations: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  routes: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
            },
            nonRedundantRoutes: {
              type: "array",
              items: {
                type: "string",
              },
            },
            wasSimulationSuccessful: {
              type: "boolean",
            },
            failoverConnectionDetails: {
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
      },
    },
  },
};

export default VirtualNetworkGateways_GetFailoverSingleTestDetails;
