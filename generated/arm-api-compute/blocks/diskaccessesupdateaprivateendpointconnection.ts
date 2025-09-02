import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DiskAccesses_UpdateAPrivateEndpointConnection: AppBlock = {
  name: "Disk Accesses / Update A Private Endpoint Connection",
  description:
    "Approve or reject a private endpoint connection under disk access resource, this can't be used to create a new private endpoint connection.",
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
        privateEndpointConnection: {
          name: "Private Endpoint Connection",
          description:
            "private endpoint connection object supplied in the body of the Put private endpoint connection operation.",
          type: {
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
        const requestBody = input.event.inputConfig.privateEndpointConnection;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/diskAccesses/${input.event.inputConfig.diskAccessName}/privateEndpointConnections/${input.event.inputConfig.privateEndpointConnectionName}` +
          "?api-version=2025-01-02";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
          requestBody,
          undefined,
          input.event.inputConfig.isBinaryData || false,
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
  },
};

export default DiskAccesses_UpdateAPrivateEndpointConnection;
