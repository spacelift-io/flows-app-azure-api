import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Registries_ImportImage: AppBlock = {
  name: "Registries / Import Image",
  description:
    "Copies an image to this container registry from the specified container registry.",
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
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              source: {
                type: "object",
                properties: {
                  resourceId: {
                    type: "string",
                  },
                  registryUri: {
                    type: "string",
                  },
                  credentials: {
                    type: "object",
                    properties: {
                      username: {
                        type: "string",
                      },
                      password: {
                        type: "string",
                      },
                    },
                    required: ["password"],
                  },
                  sourceImage: {
                    type: "string",
                  },
                },
                required: ["sourceImage"],
              },
              targetTags: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              untaggedTargetRepositories: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              mode: {
                type: "string",
              },
            },
            required: ["source"],
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/${input.event.inputConfig.registryName}/importImage` +
          "?api-version=2025-04-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
        additionalProperties: true,
      },
    },
  },
};

export default Registries_ImportImage;
