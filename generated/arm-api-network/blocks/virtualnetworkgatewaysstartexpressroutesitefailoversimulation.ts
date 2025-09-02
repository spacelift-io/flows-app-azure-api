import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGateways_StartExpressRouteSiteFailoverSimulation: AppBlock =
  {
    name: "Virtual Network Gateways / Start Express Route Site Failover Simulation",
    description:
      "This operation starts failover simulation on the gateway for the specified peering location",
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
            `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualNetworkGateways/${input.event.inputConfig.virtualNetworkGatewayName}/startSiteFailoverTest` +
            "?api-version=2024-10-01" +
            (input.event.inputConfig.peeringLocation
              ? `&peeringLocation=${input.event.inputConfig.peeringLocation}`
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
          type: "string",
        },
      },
    },
  };

export default VirtualNetworkGateways_StartExpressRouteSiteFailoverSimulation;
