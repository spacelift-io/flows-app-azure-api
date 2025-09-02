import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagementGroupNetworkManagerConnections_List: AppBlock = {
  name: "Management Group Network Manager Connections / List",
  description:
    "List all network manager connections created by this management group.",
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
        $top: {
          name: "Top",
          type: "number",
          required: false,
        },
        $skipToken: {
          name: "Skip Token",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/providers/Microsoft.Management/managementGroups/${input.event.inputConfig.managementGroupId}/providers/Microsoft.Network/networkManagerConnections` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.$top
            ? `&$top=${input.event.inputConfig.$top}`
            : "") +
          (input.event.inputConfig.$skipToken
            ? `&$skipToken=${input.event.inputConfig.$skipToken}`
            : "");

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
          value: {
            type: "array",
            items: {
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ManagementGroupNetworkManagerConnections_List;
