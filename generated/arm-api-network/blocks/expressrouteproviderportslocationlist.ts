import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRouteProviderPortsLocation_List: AppBlock = {
  name: "Express Route Provider Ports Location / List",
  description: "Retrieves all the ExpressRouteProviderPorts in a subscription.",
  category: "Express Route Provider Ports Location",
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
        $filter: {
          name: "Filter",
          description:
            "The filter to apply on the operation. For example, you can use $filter=location eq '{state}'.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/expressRouteProviderPorts` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.$filter
            ? `&$filter=${input.event.inputConfig.$filter}`
            : "");

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
                    portPairDescriptor: {
                      type: "string",
                    },
                    primaryAzurePort: {
                      type: "string",
                    },
                    secondaryAzurePort: {
                      type: "string",
                    },
                    peeringLocation: {
                      type: "string",
                    },
                    overprovisionFactor: {
                      type: "integer",
                    },
                    portBandwidthInMbps: {
                      type: "integer",
                    },
                    usedBandwidthInMbps: {
                      type: "integer",
                    },
                    remainingBandwidthInMbps: {
                      type: "integer",
                    },
                  },
                },
                etag: {
                  type: "string",
                },
                id: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                type: {
                  type: "string",
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

export default ExpressRouteProviderPortsLocation_List;
