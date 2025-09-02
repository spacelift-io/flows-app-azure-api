import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualRouterPeerings_Delete: AppBlock = {
  name: "Virtual Router Peerings / Delete",
  description: "Deletes the specified peering from a Virtual Router.",
  category: "Virtual Router Peerings",
  inputs: {
    default: {
      config: {
        virtualRouterName: {
          name: "Virtual Router Name",
          description: "Name of the virtual router",
          type: "string",
          required: true,
        },
        peeringName: {
          name: "Peering Name",
          description: "Name of the peering",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualRouters/${input.event.inputConfig.virtualRouterName}/peerings/${input.event.inputConfig.peeringName}` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "DELETE",
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
        additionalProperties: true,
      },
    },
  },
};

export default VirtualRouterPeerings_Delete;
