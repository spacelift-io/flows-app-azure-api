import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DeletedAccounts_Get: AppBlock = {
  name: "Deleted Accounts / Get",
  description: "Get properties of specified deleted account resource.",
  category: "Deleted Accounts",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        deletedAccountName: {
          name: "Deleted Account Name",
          description: "Name of the deleted account",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Storage/locations/${input.event.inputConfig.location}/deletedAccounts/${input.event.inputConfig.deletedAccountName}` +
          "?api-version=2025-01-01";

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
              storageAccountResourceId: {
                type: "string",
              },
              location: {
                type: "string",
              },
              restoreReference: {
                type: "string",
              },
              creationTime: {
                type: "string",
              },
              deletionTime: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default DeletedAccounts_Get;
