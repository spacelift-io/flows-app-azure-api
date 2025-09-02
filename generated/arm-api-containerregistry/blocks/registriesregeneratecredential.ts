import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Registries_RegenerateCredential: AppBlock = {
  name: "Registries / Regenerate Credential",
  description:
    "Regenerates one of the login credentials for the specified container registry.",
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
        regenerateCredentialParameters: {
          name: "Regenerate Credential Parameters",
          description:
            "Specifies name of the password which should be regenerated -- password or password2.",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
            },
            required: ["name"],
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
        const requestBody =
          input.event.inputConfig.regenerateCredentialParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/${input.event.inputConfig.registryName}/regenerateCredential` +
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
        properties: {
          username: {
            type: "string",
          },
          passwords: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                value: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default Registries_RegenerateCredential;
