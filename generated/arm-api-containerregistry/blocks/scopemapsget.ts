import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ScopeMaps_Get: AppBlock = {
  name: "Scope Maps / Get",
  description: "Gets the properties of the specified scope map.",
  category: "Scope Maps",
  inputs: {
    default: {
      config: {
        registryName: {
          name: "Registry Name",
          description: "Name of the registry",
          type: "string",
          required: true,
        },
        scopeMapName: {
          name: "Scope Map Name",
          description: "Name of the scope map",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/${input.event.inputConfig.registryName}/scopeMaps/${input.event.inputConfig.scopeMapName}` +
          "?api-version=2025-04-01";

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
              description: {
                type: "string",
              },
              type: {
                type: "string",
              },
              creationDate: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
              actions: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
            required: ["actions"],
          },
        },
      },
    },
  },
};

export default ScopeMaps_Get;
