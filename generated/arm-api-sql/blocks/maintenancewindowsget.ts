import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const MaintenanceWindows_Get: AppBlock = {
  name: "Maintenance Windows / Get",
  description: "Gets maintenance windows settings for a database.",
  category: "Maintenance Windows",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        databaseName: {
          name: "Database Name",
          description: "Name of the database",
          type: "string",
          required: true,
        },
        maintenanceWindowName: {
          name: "Maintenance Window Name",
          description: "Maintenance window name.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/maintenanceWindows/current` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.maintenanceWindowName
            ? `&maintenanceWindowName=${input.event.inputConfig.maintenanceWindowName}`
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
              timeRanges: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    dayOfWeek: {
                      type: "string",
                    },
                    startTime: {
                      type: "string",
                    },
                    duration: {
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
};

export default MaintenanceWindows_Get;
