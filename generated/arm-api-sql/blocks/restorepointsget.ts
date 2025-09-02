import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const RestorePoints_Get: AppBlock = {
  name: "Restore Points / Get",
  description: "Gets a restore point.",
  category: "Restore Points",
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
        restorePointName: {
          name: "Restore Point Name",
          description: "Name of the restore point",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/restorePoints/${input.event.inputConfig.restorePointName}` +
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
          location: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              restorePointType: {
                type: "string",
              },
              earliestRestoreDate: {
                type: "string",
              },
              restorePointCreationDate: {
                type: "string",
              },
              restorePointLabel: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default RestorePoints_Get;
