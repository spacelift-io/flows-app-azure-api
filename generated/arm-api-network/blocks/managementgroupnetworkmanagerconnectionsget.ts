import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagementGroupNetworkManagerConnections_Get: AppBlock = {
  name: "Management Group Network Manager Connections / Get",
  description: "Get a specified connection created by this management group.",
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
          "GET",
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
        properties: {
          properties: {
            type: "object",
            properties: {
              networkManagerId: {
                type: "string",
              },
              connectionState: {
                type: "string",
              },
              description: {
                type: "string",
              },
            },
          },
          etag: {
            type: "string",
          },
          systemData: {
            type: "object",
            properties: {
              createdBy: {
                type: "string",
              },
              createdByType: {
                type: "string",
              },
              createdAt: {
                type: "string",
              },
              lastModifiedBy: {
                type: "string",
              },
              lastModifiedByType: {
                type: "string",
              },
              lastModifiedAt: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default ManagementGroupNetworkManagerConnections_Get;
