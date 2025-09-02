import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ActionGroups_EnableReceiver: AppBlock = {
  name: "Action Groups / Enable Receiver",
  description:
    "Enable a receiver in an action group. This changes the receiver's status from Disabled to Enabled. This operation is only supported for Email or SMS receivers.",
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
        enableRequest: {
          name: "Enable Request",
          description: "The receiver to re-enable.",
          type: {
            type: "object",
            properties: {
              receiverName: {
                type: "string",
              },
            },
            required: ["receiverName"],
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
        const requestBody = input.event.inputConfig.enableRequest;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Insights/actionGroups/${input.event.inputConfig.actionGroupName}/subscribe` +
          "?api-version=2023-01-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
        additionalProperties: true,
      },
    },
  },
};

export default ActionGroups_EnableReceiver;
