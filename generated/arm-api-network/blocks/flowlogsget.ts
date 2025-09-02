import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FlowLogs_Get: AppBlock = {
  name: "Flow Logs / Get",
  description: "Gets a flow log resource by name.",
  category: "Flow Logs",
  inputs: {
    default: {
      config: {
        networkWatcherName: {
          name: "Network Watcher Name",
          description: "Name of the network watcher",
          type: "string",
          required: true,
        },
        flowLogName: {
          name: "Flow Log Name",
          description: "Name of the flow log",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkWatchers/${input.event.inputConfig.networkWatcherName}/flowLogs/${input.event.inputConfig.flowLogName}` +
          "?api-version=2024-10-01";

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
              targetResourceId: {
                type: "string",
              },
              targetResourceGuid: {
                type: "string",
              },
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
              provisioningState: {
                type: "string",
              },
            },
            required: ["targetResourceId", "storageId"],
          },
          etag: {
            type: "string",
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
      },
    },
  },
};

export default FlowLogs_Get;
