import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_MigrateStorage: AppBlock = {
  name: "Web Apps / Migrate Storage",
  description: "Description for Restores a web app.",
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
        subscriptionName: {
          name: "Subscription Name",
          description: "Azure subscription.",
          type: "string",
          required: true,
        },
        migrationOptions: {
          name: "Migration Options",
          description: "Migration migrationOptions.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  azurefilesConnectionString: {
                    type: "string",
                  },
                  azurefilesShare: {
                    type: "string",
                  },
                  switchSiteAfterMigration: {
                    type: "boolean",
                  },
                  blockWriteAccessToSite: {
                    type: "boolean",
                  },
                },
                required: ["azurefilesConnectionString", "azurefilesShare"],
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
        const requestBody = input.event.inputConfig.migrationOptions;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/migrate` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.subscriptionName
            ? `&subscriptionName=${input.event.inputConfig.subscriptionName}`
            : "");

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
              operationId: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_MigrateStorage;
