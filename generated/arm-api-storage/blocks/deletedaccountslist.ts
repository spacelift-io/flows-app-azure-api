import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DeletedAccounts_List: AppBlock = {
  name: "Deleted Accounts / List",
  description: "Lists deleted accounts under the subscription.",
  category: "Deleted Accounts",
  inputs: {
    default: {
      config: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Storage/deletedAccounts` +
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
          value: {
            type: "array",
            items: {
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default DeletedAccounts_List;
