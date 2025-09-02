import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Recommendations_List: AppBlock = {
  name: "Recommendations / List",
  description: "Description for List all recommendations for a subscription.",
  category: "Recommendations",
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
        featured: {
          name: "Featured",
          description:
            "Specify <code>true</code> to return only the most critical recommendations. The default is <code>false</code>, which returns all recommendations.",
          type: "boolean",
          required: false,
        },
        $filter: {
          name: "Filter",
          description:
            "Filter is specified by using OData syntax. Example: $filter=channel eq 'Api' or channel eq 'Notification' and startTime eq 2014-01-01T00:00:00Z and endTime eq 2014-12-31T23:59:59Z and timeGrain eq duration'[PT1H|PT1M|P1D]",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Web/recommendations` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.featured
            ? `&featured=${input.event.inputConfig.featured}`
            : "") +
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
                    creationTime: {
                      type: "string",
                    },
                    recommendationId: {
                      type: "string",
                    },
                    resourceId: {
                      type: "string",
                    },
                    resourceScope: {
                      type: "string",
                    },
                    ruleName: {
                      type: "string",
                    },
                    displayName: {
                      type: "string",
                    },
                    message: {
                      type: "string",
                    },
                    level: {
                      type: "string",
                    },
                    channels: {
                      type: "string",
                    },
                    categoryTags: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    actionName: {
                      type: "string",
                    },
                    enabled: {
                      type: "integer",
                    },
                    states: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    startTime: {
                      type: "string",
                    },
                    endTime: {
                      type: "string",
                    },
                    nextNotificationTime: {
                      type: "string",
                    },
                    notificationExpirationTime: {
                      type: "string",
                    },
                    notifiedTime: {
                      type: "string",
                    },
                    score: {
                      type: "number",
                    },
                    isDynamic: {
                      type: "boolean",
                    },
                    extensionName: {
                      type: "string",
                    },
                    bladeName: {
                      type: "string",
                    },
                    forwardLink: {
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

export default Recommendations_List;
