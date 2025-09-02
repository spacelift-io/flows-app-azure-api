import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SubscriptionNetworkManagerConnections_Delete: AppBlock = {
  name: "Subscription Network Manager Connections / Delete",
  description: "Delete specified connection created by this subscription.",
  category: "Subscription Network Manager Connections",
  inputs: {
    default: {
      config: {
        networkManagerConnectionName: {
          name: "Network Manager Connection Name",
          description: "Name of the network manager connection",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/networkManagerConnections/${input.event.inputConfig.networkManagerConnectionName}` +
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

export default SubscriptionNetworkManagerConnections_Delete;
