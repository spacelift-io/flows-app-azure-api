import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Secrets_Get: AppBlock = {
  name: "Secrets / Get",
  description:
    "Gets the specified secret.  NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets.",
  category: "Secrets",
  inputs: {
    default: {
      config: {
        vaultName: {
          name: "Vault Name",
          description: "Name of the vault",
          type: "string",
          required: true,
        },
        secretName: {
          name: "Secret Name",
          description: "Name of the secret",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.KeyVault/vaults/${input.event.inputConfig.vaultName}/secrets/${input.event.inputConfig.secretName}` +
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
              value: {
                type: "string",
              },
              contentType: {
                type: "string",
              },
              attributes: {
                type: "object",
              },
              secretUri: {
                type: "string",
              },
              secretUriWithVersion: {
                type: "string",
              },
            },
          },
        },
        required: ["properties"],
      },
    },
  },
};

export default Secrets_Get;
