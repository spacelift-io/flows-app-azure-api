import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkWatchers_GetFlowLogStatus: AppBlock = {
  name: "Network Watchers / Get Flow Log Status",
  description:
    "Queries status of flow log and traffic analytics (optional) on a specified resource.",
  category: "Network Watchers",
  inputs: {
    default: {
      config: {
        networkWatcherName: {
          name: "Network Watcher Name",
          description: "Name of the network watcher",
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
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkWatchers/${input.event.inputConfig.networkWatcherName}/queryFlowLogStatus` +
          "?api-version=2024-10-01";

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
          targetResourceId: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              storageId: {
                type: "string",
              },
              enabledFilteringCriteria: {
                type: "string",
              },
              enabled: {
                type: "boolean",
              },
              retentionPolicy: {
                type: "object",
                properties: {
                  days: {
                    type: "integer",
                  },
                  enabled: {
                    type: "boolean",
                  },
                },
              },
              format: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                  },
                  version: {
                    type: "integer",
                  },
                },
              },
            },
            required: ["storageId", "enabled"],
          },
          flowAnalyticsConfiguration: {
            type: "object",
            properties: {
              networkWatcherFlowAnalyticsConfiguration: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  workspaceId: {
                    type: "string",
                  },
                  workspaceRegion: {
                    type: "string",
                  },
                  workspaceResourceId: {
                    type: "string",
                  },
                  trafficAnalyticsInterval: {
                    type: "integer",
                  },
                },
              },
            },
          },
          identity: {
            type: "object",
            properties: {
              principalId: {
                type: "string",
              },
              tenantId: {
                type: "string",
              },
              type: {
                type: "string",
              },
              userAssignedIdentities: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
        },
        required: ["targetResourceId", "properties"],
      },
    },
  },
};

export default NetworkWatchers_GetFlowLogStatus;
