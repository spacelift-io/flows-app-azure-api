import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ServerBlobAuditingPolicies_ListByServer: AppBlock = {
  name: "Server Blob Auditing Policies / List By Server",
  description: "Lists auditing settings of a server.",
  category: "Server Blob Auditing Policies",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/auditingSettings` +
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    isDevopsAuditEnabled: {
                      type: "boolean",
                    },
                    retentionDays: {
                      type: "integer",
                    },
                    auditActionsAndGroups: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    isStorageSecondaryKeyInUse: {
                      type: "boolean",
                    },
                    isAzureMonitorTargetEnabled: {
                      type: "boolean",
                    },
                    queueDelayMs: {
                      type: "integer",
                    },
                    isManagedIdentityInUse: {
                      type: "boolean",
                    },
                    state: {
                      type: "string",
                    },
                    storageEndpoint: {
                      type: "string",
                    },
                    storageAccountAccessKey: {
                      type: "string",
                    },
                    storageAccountSubscriptionId: {
                      type: "string",
                    },
                  },
                  required: ["state"],
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ServerBlobAuditingPolicies_ListByServer;
