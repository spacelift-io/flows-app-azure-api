import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PrivateLinkServices_DeletePrivateEndpointConnection: AppBlock = {
  name: "Private Link Services / Delete Private Endpoint Connection",
  description:
    "Delete private end point connection for a private link service in a subscription.",
  category: "Private Link Services",
  inputs: {
    default: {
      config: {
        serviceName: {
          name: "Service Name",
          description: "Name of the service",
          type: "string",
          required: true,
        },
        peConnectionName: {
          name: "Pe Connection Name",
          description: "Name of the pe connection",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/privateLinkServices/${input.event.inputConfig.serviceName}/privateEndpointConnections/${input.event.inputConfig.peConnectionName}` +
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

export default PrivateLinkServices_DeletePrivateEndpointConnection;
