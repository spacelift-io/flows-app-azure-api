import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRoutePortsLocations_List: AppBlock = {
  name: "Express Route Ports Locations / List",
  description:
    "Retrieves all ExpressRoutePort peering locations. Does not return available bandwidths for each location. Available bandwidths can only be obtained when retrieving a specific peering location.",
  category: "Express Route Ports Locations",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/ExpressRoutePortsLocations` +
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
          value: {
            type: "array",
            items: {
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ExpressRoutePortsLocations_List;
