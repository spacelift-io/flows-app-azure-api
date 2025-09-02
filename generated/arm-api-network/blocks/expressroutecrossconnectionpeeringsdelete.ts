import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRouteCrossConnectionPeerings_Delete: AppBlock = {
  name: "Express Route Cross Connection Peerings / Delete",
  description:
    "Deletes the specified peering from the ExpressRouteCrossConnection.",
  category: "Express Route Cross Connection Peerings",
  inputs: {
    default: {
      config: {
        crossConnectionName: {
          name: "Cross Connection Name",
          description: "Name of the cross connection",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/${input.event.inputConfig.crossConnectionName}/peerings/${input.event.inputConfig.peeringName}` +
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

export default ExpressRouteCrossConnectionPeerings_Delete;
