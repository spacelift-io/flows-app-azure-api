import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Global_GetDeletedWebAppSnapshots: AppBlock = {
  name: "Global / Get Deleted Web App Snapshots",
  description: "Description for Get all deleted apps for a subscription.",
  category: "Global",
  inputs: {
    default: {
      config: {
        deletedSiteId: {
          name: "Deleted Site ID",
          description: "Unique identifier",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Web/deletedSites/${input.event.inputConfig.deletedSiteId}/snapshots` +
          "?api-version=2024-11-01";

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
        type: "array",
        items: {
          type: "object",
          properties: {
            properties: {
              type: "object",
              properties: {
                time: {
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

export default Global_GetDeletedWebAppSnapshots;
