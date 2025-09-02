import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PrivateEndpointConnections_Get: AppBlock = {
  name: "Private Endpoint Connections / Get",
  description:
    "Gets the specified private endpoint connection associated with the key vault.",
  category: "Private Endpoint Connections",
  inputs: {
    default: {
      config: {
        vaultName: {
          name: "Vault Name",
          description: "Name of the vault",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.KeyVault/vaults/${input.event.inputConfig.vaultName}/privateEndpointConnections/${input.event.inputConfig.privateEndpointConnectionName}` +
          "?api-version=2023-07-01";

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
          },
          etag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default PrivateEndpointConnections_Get;
