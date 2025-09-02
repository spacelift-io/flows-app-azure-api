import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Vaults_GetDeleted: AppBlock = {
  name: "Vaults / Get Deleted",
  description: "Gets the deleted Azure key vault.",
  category: "Vaults",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        vaultName: {
          name: "Vault Name",
          description: "Name of the vault",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.KeyVault/locations/${input.event.inputConfig.location}/deletedVaults/${input.event.inputConfig.vaultName}` +
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
              vaultId: {
                type: "string",
              },
              location: {
                type: "string",
              },
              deletionDate: {
                type: "string",
              },
              scheduledPurgeDate: {
                type: "string",
              },
              tags: {
                type: "object",
                additionalProperties: true,
              },
              purgeProtectionEnabled: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
  },
};

export default Vaults_GetDeleted;
