import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ActionGroups_GetTestNotificationsAtActionGroupResourceLevel: AppBlock = {
  name: "Action Groups / Get Test Notifications At Action Group Resource Level",
  description: "Get the test notifications by the notification id",
  category: "Action Groups",
  inputs: {
    default: {
      config: {
        actionGroupName: {
          name: "Action Group Name",
          description: "Name of the action group",
          type: "string",
          required: true,
        },
        notificationId: {
          name: "Notification ID",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Insights/actionGroups/${input.event.inputConfig.actionGroupName}/notificationStatus/${input.event.inputConfig.notificationId}` +
          "?api-version=2023-01-01";

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
          context: {
            type: "object",
            properties: {
              notificationSource: {
                type: "string",
              },
              contextType: {
                type: "string",
              },
            },
          },
          state: {
            type: "string",
          },
          completedTime: {
            type: "string",
          },
          createdTime: {
            type: "string",
          },
          actionDetails: {
            type: "array",
            items: {
              type: "object",
              properties: {
                MechanismType: {
                  type: "string",
                },
                Name: {
                  type: "string",
                },
                Status: {
                  type: "string",
                },
                SubState: {
                  type: "string",
                },
                SendTime: {
                  type: "string",
                },
                Detail: {
                  type: "string",
                },
              },
            },
          },
        },
        required: ["state"],
      },
    },
  },
};

export default ActionGroups_GetTestNotificationsAtActionGroupResourceLevel;
