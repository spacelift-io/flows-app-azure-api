import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DeletedWebApps_GetDeletedWebAppByLocation: AppBlock = {
  name: "Deleted Web Apps / Get Deleted Web App By Location",
  description:
    "Description for Get deleted app for a subscription at location.",
  category: "Deleted Web Apps",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Web/locations/${input.event.inputConfig.location}/deletedSites/${input.event.inputConfig.deletedSiteId}` +
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
  },
};

export default DeletedWebApps_GetDeletedWebAppByLocation;
