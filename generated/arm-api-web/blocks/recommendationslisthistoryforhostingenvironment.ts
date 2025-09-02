import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Recommendations_ListHistoryForHostingEnvironment: AppBlock = {
  name: "Recommendations / List History For Hosting Environment",
  description:
    "Description for Get past recommendations for an app, optionally specified by the time range.",
  category: "Recommendations",
  inputs: {
    default: {
      config: {
        hostingEnvironmentName: {
          name: "Hosting Environment Name",
          description: "Name of the hosting environment",
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
        resourceGroupName: {
          name: "Resource Group Name",
          description:
            "Azure resource group name (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
        expiredOnly: {
          name: "Expired Only",
          description:
            "Specify <code>false</code> to return all recommendations. The default is <code>true</code>, which returns only expired recommendations.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/${input.event.inputConfig.hostingEnvironmentName}/recommendationHistory` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.expiredOnly
            ? `&expiredOnly=${input.event.inputConfig.expiredOnly}`
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

export default Recommendations_ListHistoryForHostingEnvironment;
