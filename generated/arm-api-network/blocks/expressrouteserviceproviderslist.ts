import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRouteServiceProviders_List: AppBlock = {
  name: "Express Route Service Providers / List",
  description: "Gets all the available express route service providers.",
  category: "Express Route Service Providers",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/expressRouteServiceProviders` +
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
                    peeringLocations: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    bandwidthsOffered: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          offerName: {
                            type: "string",
                          },
                          valueInMbps: {
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

export default ExpressRouteServiceProviders_List;
