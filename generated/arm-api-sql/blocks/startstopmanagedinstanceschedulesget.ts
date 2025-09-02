import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StartStopManagedInstanceSchedules_Get: AppBlock = {
  name: "Start Stop Managed Instance Schedules / Get",
  description: "Gets the managed instance's Start/Stop schedule.",
  category: "Start Stop Managed Instance Schedules",
  inputs: {
    default: {
      config: {
        managedInstanceName: {
          name: "Managed Instance Name",
          description: "Name of the managed instance",
          type: "string",
          required: true,
        },
        startStopScheduleName: {
          name: "Start Stop Schedule Name",
          description: "Name of the start stop schedule",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/managedInstances/${input.event.inputConfig.managedInstanceName}/startStopSchedules/${input.event.inputConfig.startStopScheduleName}` +
          "?api-version=2023-08-01";

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
          systemData: {
            type: "object",
            properties: {
              createdBy: {
                type: "string",
              },
              createdByType: {
                type: "string",
              },
              createdAt: {
                type: "string",
              },
              lastModifiedBy: {
                type: "string",
              },
              lastModifiedByType: {
                type: "string",
              },
              lastModifiedAt: {
                type: "string",
              },
            },
          },
          properties: {
            type: "object",
            properties: {
              description: {
                type: "string",
              },
              timeZoneId: {
                type: "string",
              },
              scheduleList: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    startDay: {
                      type: "string",
                    },
                    startTime: {
                      type: "string",
                    },
                    stopDay: {
                      type: "string",
                    },
                    stopTime: {
                      type: "string",
                    },
                  },
                  required: ["startDay", "startTime", "stopDay", "stopTime"],
                },
              },
              nextRunAction: {
                type: "string",
              },
              nextExecutionTime: {
                type: "string",
              },
            },
            required: ["scheduleList"],
          },
        },
      },
    },
  },
};

export default StartStopManagedInstanceSchedules_Get;
