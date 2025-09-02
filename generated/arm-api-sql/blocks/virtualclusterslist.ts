import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualClusters_List: AppBlock = {
  name: "Virtual Clusters / List",
  description: "Gets a list of all virtualClusters in the subscription.",
  category: "Virtual Clusters",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Sql/virtualClusters` +
          "?api-version=2023-08-01";

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
                    subnetId: {
                      type: "string",
                    },
                    version: {
                      type: "string",
                    },
                    childResources: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              required: ["location"],
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

export default VirtualClusters_List;
