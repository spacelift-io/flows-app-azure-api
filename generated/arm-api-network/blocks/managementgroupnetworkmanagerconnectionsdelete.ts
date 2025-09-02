import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagementGroupNetworkManagerConnections_Delete: AppBlock = {
  name: "Management Group Network Manager Connections / Delete",
  description:
    "Delete specified pending connection created by this management group.",
  category: "Management Group Network Manager Connections",
  inputs: {
    default: {
      config: {
        managementGroupId: {
          name: "Management Group ID",
          description: "Unique identifier",
          type: "string",
          required: true,
        },
        networkManagerConnectionName: {
          name: "Network Manager Connection Name",
          description: "Name of the network manager connection",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/providers/Microsoft.Management/managementGroups/${input.event.inputConfig.managementGroupId}/providers/Microsoft.Network/networkManagerConnections/${input.event.inputConfig.networkManagerConnectionName}` +
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

export default ManagementGroupNetworkManagerConnections_Delete;
