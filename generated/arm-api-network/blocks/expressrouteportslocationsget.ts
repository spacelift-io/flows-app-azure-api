import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRoutePortsLocations_Get: AppBlock = {
  name: "Express Route Ports Locations / Get",
  description:
    "Retrieves a single ExpressRoutePort peering location, including the list of available bandwidths available at said peering location.",
  category: "Express Route Ports Locations",
  inputs: {
    default: {
      config: {
        locationName: {
          name: "Location Name",
          description: "Name of the location",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/ExpressRoutePortsLocations/${input.event.inputConfig.locationName}` +
          "?api-version=2024-10-01";

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
              address: {
                type: "string",
              },
              contact: {
                type: "string",
              },
              availableBandwidths: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    offerName: {
                      type: "string",
                    },
                    valueInGbps: {
                      type: "integer",
                    },
                  },
                },
              },
              provisioningState: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default ExpressRoutePortsLocations_Get;
