import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_ListSlotDifferencesFromProduction: AppBlock = {
  name: "Web Apps / List Slot Differences From Production",
  description:
    "Description for Get the difference in configuration settings between two web app slots.",
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
        slotSwapEntity: {
          name: "Slot Swap Entity",
          description:
            "JSON object that contains the target slot name. See example.",
          type: {
            type: "object",
            properties: {
              targetSlot: {
                type: "string",
              },
              preserveVnet: {
                type: "boolean",
              },
            },
            required: ["targetSlot", "preserveVnet"],
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
        const requestBody = input.event.inputConfig.slotSwapEntity;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slotsdiffs` +
          "?api-version=2024-11-01";

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
        properties: {
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    level: {
                      type: "string",
                    },
                    settingType: {
                      type: "string",
                    },
                    diffRule: {
                      type: "string",
                    },
                    settingName: {
                      type: "string",
                    },
                    valueInCurrentSlot: {
                      type: "string",
                    },
                    valueInTargetSlot: {
                      type: "string",
                    },
                    description: {
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

export default WebApps_ListSlotDifferencesFromProduction;
