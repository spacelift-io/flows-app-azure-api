import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Vaults_CheckNameAvailability: AppBlock = {
  name: "Vaults / Check Name Availability",
  description: "Checks that the vault name is valid and is not already in use.",
  category: "Vaults",
  inputs: {
    default: {
      config: {
        vaultName: {
          name: "Vault Name",
          description: "The name of the vault.",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              type: {
                type: "string",
              },
            },
            required: ["name", "type"],
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
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.vaultName;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.KeyVault/checkNameAvailability` +
          "?api-version=2023-07-01";

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
          nameAvailable: {
            type: "boolean",
          },
          reason: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Vaults_CheckNameAvailability;
