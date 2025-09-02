import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ConnectionMonitors_CreateOrUpdate: AppBlock = {
  name: "Connection Monitors / Create Or Update",
  description: "Create or update a connection monitor.",
  category: "Connection Monitors",
  inputs: {
    default: {
      config: {
        networkWatcherName: {
          name: "Network Watcher Name",
          description: "Name of the network watcher",
          type: "string",
          required: true,
        },
        connectionMonitorName: {
          name: "Connection Monitor Name",
          description: "Name of the connection monitor",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
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
        migrate: {
          name: "Migrate",
          description:
            "Value indicating whether connection monitor V1 should be migrated to V2 format.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkWatchers/${input.event.inputConfig.networkWatcherName}/connectionMonitors/${input.event.inputConfig.connectionMonitorName}` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.migrate
            ? `&migrate=${input.event.inputConfig.migrate}`
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
          name: {
            type: "string",
          },
          id: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          type: {
            type: "string",
          },
          location: {
            type: "string",
          },
          tags: {
            type: "object",
            additionalProperties: true,
          },
          properties: {
            type: "object",
            properties: {
              provisioningState: {
                type: "string",
              },
              startTime: {
                type: "string",
              },
              monitoringStatus: {
                type: "string",
              },
              connectionMonitorType: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default ConnectionMonitors_CreateOrUpdate;
