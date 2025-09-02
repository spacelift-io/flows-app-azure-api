import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PrivateEndpointConnections_Update: AppBlock = {
  name: "Private Endpoint Connections / Update",
  description: "Updates a private endpoint connection.",
  category: "Private Endpoint Connections",
  inputs: {
    default: {
      config: {
        resourceName: {
          name: "Resource Name",
          description: "Name of the resource",
          type: "string",
          required: true,
        },
        privateEndpointConnectionName: {
          name: "Private Endpoint Connection Name",
          description: "Name of the private endpoint connection",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "The updated private endpoint connection.",
          type: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              type: {
                type: "string",
              },
              properties: {
                type: "object",
                properties: {
                  provisioningState: {
                    type: "string",
                  },
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
                    },
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/${input.event.inputConfig.resourceName}/privateEndpointConnections/${input.event.inputConfig.privateEndpointConnectionName}` +
          "?api-version=2025-07-01";

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
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          type: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              provisioningState: {
                type: "string",
              },
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
                },
              },
            },
            required: ["privateLinkServiceConnectionState"],
          },
        },
      },
    },
  },
};

export default PrivateEndpointConnections_Update;
