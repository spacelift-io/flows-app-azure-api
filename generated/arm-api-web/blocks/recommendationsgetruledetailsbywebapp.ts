import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Recommendations_GetRuleDetailsByWebApp: AppBlock = {
  name: "Recommendations / Get Rule Details By Web App",
  description: "Description for Get a recommendation rule for an app.",
  category: "Recommendations",
  inputs: {
    default: {
      config: {
        siteName: {
          name: "Site Name",
          description: "Name of the site",
          type: "string",
          required: true,
        },
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
        updateSeen: {
          name: "Update Seen",
          description:
            "Specify <code>true</code> to update the last-seen timestamp of the recommendation object.",
          type: "boolean",
          required: false,
        },
        recommendationId: {
          name: "Recommendation ID",
          description:
            "The GUID of the recommendation object if you query an expired one. You don't need to specify it to query an active entry.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.siteName}/recommendations/${input.event.inputConfig.name}` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.updateSeen
            ? `&updateSeen=${input.event.inputConfig.updateSeen}`
            : "") +
          (input.event.inputConfig.recommendationId
            ? `&recommendationId=${input.event.inputConfig.recommendationId}`
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
          properties: {
            type: "object",
            properties: {
              recommendationName: {
                type: "string",
              },
              displayName: {
                type: "string",
              },
              message: {
                type: "string",
              },
              recommendationId: {
                type: "string",
              },
              description: {
                type: "string",
              },
              actionName: {
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
  },
};

export default Recommendations_GetRuleDetailsByWebApp;
