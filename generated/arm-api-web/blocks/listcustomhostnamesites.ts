import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ListCustomHostNameSites: AppBlock = {
  name: "List Custom Host Name Sites",
  description: "Get custom hostnames under this subscription",
  category: "General",
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
        hostname: {
          name: "Host Name",
          description: "Specific hostname",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Web/customhostnameSites` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.hostname
            ? `&hostname=${input.event.inputConfig.hostname}`
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
                    customHostname: {
                      type: "string",
                    },
                    region: {
                      type: "string",
                    },
                    siteResourceIds: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          properties: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
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

export default ListCustomHostNameSites;
