import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DiskAccesses_ListPrivateEndpointConnections: AppBlock = {
  name: "Disk Accesses / List Private Endpoint Connections",
  description:
    "List information about private endpoint connections under a disk access resource",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/diskAccesses/${input.event.inputConfig.diskAccessName}/privateEndpointConnections` +
          "?api-version=2025-01-02";

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
                    privateEndpoint: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                      },
                    },
                    privateLinkServiceConnectionState: {
                      type: "object",
                      properties: {
                        status: {
                          type: "string",
                        },
                        description: {
                          type: "string",
                        },
                        actionsRequired: {
                          type: "string",
                        },
                      },
                    },
                    provisioningState: {
                      type: "string",
                    },
                  },
                  required: ["privateLinkServiceConnectionState"],
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default DiskAccesses_ListPrivateEndpointConnections;
