import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DeletedWebApps_List: AppBlock = {
  name: "Deleted Web Apps / List",
  description: "Description for Get all deleted apps for a subscription.",
  category: "Deleted Web Apps",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Web/deletedSites` +
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
                    deletedSiteId: {
                      type: "integer",
                    },
                    deletedTimestamp: {
                      type: "string",
                    },
                    subscription: {
                      type: "string",
                    },
                    resourceGroup: {
                      type: "string",
                    },
                    deletedSiteName: {
                      type: "string",
                    },
                    slot: {
                      type: "string",
                    },
                    kind: {
                      type: "string",
                    },
                    geoRegionName: {
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
        required: ["value"],
      },
    },
  },
};

export default DeletedWebApps_List;
