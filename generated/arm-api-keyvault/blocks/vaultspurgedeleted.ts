import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Vaults_PurgeDeleted: AppBlock = {
  name: "Vaults / Purge Deleted",
  description:
    "Permanently deletes the specified vault. aka Purges the deleted Azure key vault.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.KeyVault/locations/${input.event.inputConfig.location}/deletedVaults/${input.event.inputConfig.vaultName}/purge` +
          "?api-version=2023-07-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
        additionalProperties: true,
      },
    },
  },
};

export default Vaults_PurgeDeleted;
