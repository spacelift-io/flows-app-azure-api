import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Replications_Update: AppBlock = {
  name: "Replications / Update",
  description:
    "Updates a replication for a container registry with the specified parameters.",
  category: "Replications",
  inputs: {
    default: {
      config: {
        registryName: {
          name: "Registry Name",
          description: "Name of the registry",
          type: "string",
          required: true,
        },
        replicationName: {
          name: "Replication Name",
          description: "Name of the replication",
          type: "string",
          required: true,
        },
        replicationUpdateParameters: {
          name: "Replication Update Parameters",
          type: {
            type: "object",
            properties: {
              tags: {
                type: "object",
                additionalProperties: true,
              },
              properties: {
                type: "object",
                properties: {
                  regionEndpointEnabled: {
                    type: "boolean",
                  },
                },
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
        const requestBody = input.event.inputConfig.replicationUpdateParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/${input.event.inputConfig.registryName}/replications/${input.event.inputConfig.replicationName}` +
          "?api-version=2025-04-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
              provisioningState: {
                type: "string",
              },
              status: {
                type: "object",
                properties: {
                  displayStatus: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                  timestamp: {
                    type: "string",
                  },
                },
              },
              regionEndpointEnabled: {
                type: "boolean",
              },
              zoneRedundancy: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default Replications_Update;
