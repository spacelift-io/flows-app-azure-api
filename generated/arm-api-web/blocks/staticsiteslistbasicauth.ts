import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StaticSites_ListBasicAuth: AppBlock = {
  name: "Static Sites / List Basic Auth",
  description:
    "Description for Gets the basic auth properties for a static site as a collection.",
  category: "Static Sites",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/staticSites/${input.event.inputConfig.name}/basicAuth` +
          "?api-version=2024-11-01";

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
                    password: {
                      type: "string",
                    },
                    secretUrl: {
                      type: "string",
                    },
                    applicableEnvironmentsMode: {
                      type: "string",
                    },
                    environments: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    secretState: {
                      type: "string",
                    },
                  },
                  required: ["applicableEnvironmentsMode"],
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

export default StaticSites_ListBasicAuth;
