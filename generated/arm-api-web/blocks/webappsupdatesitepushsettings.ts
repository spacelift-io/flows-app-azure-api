import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_UpdateSitePushSettings: AppBlock = {
  name: "Web Apps / Update Site Push Settings",
  description:
    "Description for Updates the Push settings associated with web app.",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        pushSettings: {
          name: "Push Settings",
          description: "Push settings associated with web app.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  isPushEnabled: {
                    type: "boolean",
                  },
                  tagWhitelistJson: {
                    type: "string",
                  },
                  tagsRequiringAuth: {
                    type: "string",
                  },
                  dynamicTagsJson: {
                    type: "string",
                  },
                },
                required: ["isPushEnabled"],
              },
            },
          },
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
        const requestBody = input.event.inputConfig.pushSettings;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/config/pushsettings` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
          requestBody,
          undefined,
          input.event.inputConfig.isBinaryData || false,
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
              isPushEnabled: {
                type: "boolean",
              },
              tagWhitelistJson: {
                type: "string",
              },
              tagsRequiringAuth: {
                type: "string",
              },
              dynamicTagsJson: {
                type: "string",
              },
            },
            required: ["isPushEnabled"],
          },
        },
      },
    },
  },
};

export default WebApps_UpdateSitePushSettings;
