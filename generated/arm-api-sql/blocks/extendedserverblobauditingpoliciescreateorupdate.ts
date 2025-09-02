import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExtendedServerBlobAuditingPolicies_CreateOrUpdate: AppBlock = {
  name: "Extended Server Blob Auditing Policies / Create Or Update",
  description: "Creates or updates an extended server's blob auditing policy.",
  category: "Extended Server Blob Auditing Policies",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        blobAuditingPolicyName: {
          name: "Blob Auditing Policy Name",
          description: "Name of the blob auditing policy",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Properties of extended blob auditing policy",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  isDevopsAuditEnabled: {
                    type: "boolean",
                  },
                  predicateExpression: {
                    type: "string",
                  },
                  retentionDays: {
                    type: "number",
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
                    type: "number",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/extendedAuditingSettings/${input.event.inputConfig.blobAuditingPolicyName}` +
          "?api-version=2023-08-01";

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
              isDevopsAuditEnabled: {
                type: "boolean",
              },
              predicateExpression: {
                type: "string",
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
  },
};

export default ExtendedServerBlobAuditingPolicies_CreateOrUpdate;
