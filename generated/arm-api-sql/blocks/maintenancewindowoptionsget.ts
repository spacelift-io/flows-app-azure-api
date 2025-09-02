import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const MaintenanceWindowOptions_Get: AppBlock = {
  name: "Maintenance Window Options / Get",
  description: "Gets a list of available maintenance windows.",
  category: "Maintenance Window Options",
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
        maintenanceWindowOptionsName: {
          name: "Maintenance Window Options Name",
          description: "Maintenance window options name.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/maintenanceWindowOptions/current` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.maintenanceWindowOptionsName
            ? `&maintenanceWindowOptionsName=${input.event.inputConfig.maintenanceWindowOptionsName}`
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
              isEnabled: {
                type: "boolean",
              },
              maintenanceWindowCycles: {
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
              minDurationInMinutes: {
                type: "integer",
              },
              defaultDurationInMinutes: {
                type: "integer",
              },
              minCycles: {
                type: "integer",
              },
              timeGranularityInMinutes: {
                type: "integer",
              },
              allowMultipleMaintenanceWindowsPerCycle: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
  },
};

export default MaintenanceWindowOptions_Get;
