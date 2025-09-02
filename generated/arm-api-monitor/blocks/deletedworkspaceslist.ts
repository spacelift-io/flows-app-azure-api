import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DeletedWorkspaces_List: AppBlock = {
  name: "Deleted Workspaces / List",
  description:
    "Gets recently deleted workspaces in a subscription, available for recovery.",
  category: "Deleted Workspaces",
  inputs: {
    default: {
      config: {
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.OperationalInsights/deletedWorkspaces` +
          "?api-version=2025-02-01";

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
                    provisioningState: {
                      type: "string",
                    },
                    customerId: {
                      type: "string",
                    },
                    sku: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        capacityReservationLevel: {
                          type: "integer",
                        },
                        lastSkuUpdate: {
                          type: "string",
                        },
                      },
                      required: ["name"],
                    },
                    retentionInDays: {
                      type: "integer",
                    },
                    workspaceCapping: {
                      type: "object",
                      properties: {
                        dailyQuotaGb: {
                          type: "number",
                        },
                        quotaNextResetTime: {
                          type: "string",
                        },
                        dataIngestionStatus: {
                          type: "string",
                        },
                      },
                    },
                    createdDate: {
                      type: "string",
                    },
                    modifiedDate: {
                      type: "string",
                    },
                    publicNetworkAccessForIngestion: {
                      type: "string",
                    },
                    publicNetworkAccessForQuery: {
                      type: "string",
                    },
                    forceCmkForQuery: {
                      type: "boolean",
                    },
                    privateLinkScopedResources: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          resourceId: {
                            type: "string",
                          },
                          scopeId: {
                            type: "string",
                          },
                        },
                      },
                    },
                    features: {
                      type: "object",
                      properties: {
                        enableDataExport: {
                          type: "boolean",
                        },
                        immediatePurgeDataOn30Days: {
                          type: "boolean",
                        },
                        enableLogAccessUsingOnlyResourcePermissions: {
                          type: "boolean",
                        },
                        clusterResourceId: {
                          type: "string",
                        },
                        disableLocalAuth: {
                          type: "boolean",
                        },
                        unifiedSentinelBillingOnly: {
                          type: "boolean",
                        },
                      },
                      additionalProperties: true,
                    },
                    defaultDataCollectionRuleResourceId: {
                      type: "string",
                    },
                    replication: {
                      type: "object",
                      properties: {
                        location: {
                          type: "string",
                        },
                        enabled: {
                          type: "boolean",
                        },
                        provisioningState: {
                          type: "string",
                        },
                        createdDate: {
                          type: "string",
                        },
                        lastModifiedDate: {
                          type: "string",
                        },
                      },
                    },
                    failover: {
                      type: "object",
                      properties: {
                        state: {
                          type: "string",
                        },
                        lastModifiedDate: {
                          type: "string",
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
                  required: ["type"],
                },
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
                etag: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default DeletedWorkspaces_List;
