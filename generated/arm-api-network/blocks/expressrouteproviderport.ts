import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRouteProviderPort: AppBlock = {
  name: "Express Route Provider Port",
  description: "Retrieves detail of a provider port.",
  category: "General",
  inputs: {
    default: {
      config: {
        providerport: {
          name: "Providerport",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/expressRouteProviderPorts/${input.event.inputConfig.providerport}` +
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
  },
};

export default ExpressRouteProviderPort;
