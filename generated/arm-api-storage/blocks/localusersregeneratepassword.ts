import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LocalUsers_RegeneratePassword: AppBlock = {
  name: "Local Users / Regenerate Password",
  description: "Regenerate the local user SSH password.",
  category: "Local Users",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        username: {
          name: "User Name",
          description: "Name of the user",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/localUsers/${input.event.inputConfig.username}/regeneratePassword` +
          "?api-version=2025-01-01";

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
        properties: {
          sshPassword: {
            type: "string",
          },
        },
      },
    },
  },
};

export default LocalUsers_RegeneratePassword;
