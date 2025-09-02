import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const MetricNamespaces_List: AppBlock = {
  name: "Metric Namespaces / List",
  description: "Lists the metric namespaces for the resource.",
  category: "Metric Namespaces",
  inputs: {
    default: {
      config: {
        resourceUri: {
          name: "Resource Uri",
          type: "string",
          required: true,
        },
        startTime: {
          name: "Start Time",
          description:
            "The ISO 8601 conform Date start time from which to query for metric namespaces.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/${input.event.inputConfig.resourceUri}/providers/microsoft.insights/metricNamespaces` +
          "?api-version=2024-02-01" +
          (input.event.inputConfig.startTime
            ? `&startTime=${input.event.inputConfig.startTime}`
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
                id: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                classification: {
                  type: "string",
                },
                properties: {
                  type: "object",
                  properties: {
                    metricNamespaceName: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        required: ["value"],
      },
    },
  },
};

export default MetricNamespaces_List;
