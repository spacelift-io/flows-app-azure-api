import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DiskAccesses_DeleteAPrivateEndpointConnection: AppBlock = {
  name: "Disk Accesses / Delete A Private Endpoint Connection",
  description:
    "Deletes a private endpoint connection under a disk access resource.",
  category: "Disk Accesses",
  inputs: {
    default: {
      config: {
        diskAccessName: {
          name: "Disk Access Name",
          description: "Name of the disk access",
          type: "string",
          required: true,
        },
        privateEndpointConnectionName: {
          name: "Private Endpoint Connection Name",
          description: "Name of the private endpoint connection",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/diskAccesses/${input.event.inputConfig.diskAccessName}/privateEndpointConnections/${input.event.inputConfig.privateEndpointConnectionName}` +
          "?api-version=2025-01-02";

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

export default DiskAccesses_DeleteAPrivateEndpointConnection;
