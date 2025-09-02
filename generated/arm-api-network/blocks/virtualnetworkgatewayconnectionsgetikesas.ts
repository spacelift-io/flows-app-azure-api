import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualNetworkGatewayConnections_GetIkeSas: AppBlock = {
  name: "Virtual Network Gateway Connections / Get Ike Sas",
  description:
    "Lists IKE Security Associations for the virtual network gateway connection in the specified resource group.",
  category: "Virtual Network Gateway Connections",
  inputs: {
    default: {
      config: {
        virtualNetworkGatewayConnectionName: {
          name: "Virtual Network Gateway Connection Name",
          description: "Name of the virtual network gateway connection",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/connections/${input.event.inputConfig.virtualNetworkGatewayConnectionName}/getikesas` +
          "?api-version=2024-10-01";

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

export default VirtualNetworkGatewayConnections_GetIkeSas;
