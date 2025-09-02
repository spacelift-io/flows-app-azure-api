import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Registries_ListPrivateLinkResources: AppBlock = {
  name: "Registries / List Private Link Resources",
  description: "Lists the private link resources for a container registry.",
  category: "Registries",
  inputs: {
    default: {
      config: {
        registryName: {
          name: "Registry Name",
          description: "Name of the registry",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/${input.event.inputConfig.registryName}/privateLinkResources` +
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                },
                id: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                properties: {
                  type: "object",
                  properties: {
                    groupId: {
                      type: "string",
                    },
                    requiredMembers: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    requiredZoneNames: {
                      type: "array",
                      items: {
                        type: "string",
                      },
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

export default Registries_ListPrivateLinkResources;
