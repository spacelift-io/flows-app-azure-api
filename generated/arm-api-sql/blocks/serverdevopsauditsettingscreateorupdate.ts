import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ServerDevOpsAuditSettings_CreateOrUpdate: AppBlock = {
  name: "Server Dev Ops Audit Settings / Create Or Update",
  description: "Creates or updates a server's DevOps audit settings.",
  category: "Server Dev Ops Audit Settings",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        devOpsAuditingSettingsName: {
          name: "Dev Ops Auditing Settings Name",
          description: "Name of the dev ops auditing settings",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Properties of DevOps audit settings",
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
                  isAzureMonitorTargetEnabled: {
                    type: "boolean",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/devOpsAuditingSettings/${input.event.inputConfig.devOpsAuditingSettingsName}` +
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
              isAzureMonitorTargetEnabled: {
                type: "boolean",
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

export default ServerDevOpsAuditSettings_CreateOrUpdate;
