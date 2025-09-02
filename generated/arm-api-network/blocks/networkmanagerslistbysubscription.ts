import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkManagers_ListBySubscription: AppBlock = {
  name: "Network Managers / List By Subscription",
  description: "List all network managers in a subscription.",
  category: "Network Managers",
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
        $top: {
          name: "Top",
          type: "number",
          required: false,
        },
        $skipToken: {
          name: "Skip Token",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/networkManagers` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.$top
            ? `&$top=${input.event.inputConfig.$top}`
            : "") +
          (input.event.inputConfig.$skipToken
            ? `&$skipToken=${input.event.inputConfig.$skipToken}`
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    description: {
                      type: "string",
                    },
                    networkManagerScopes: {
                      type: "object",
                      properties: {
                        managementGroups: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        subscriptions: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        crossTenantScopes: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              tenantId: {
                                type: "string",
                              },
                              managementGroups: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              subscriptions: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    networkManagerScopeAccesses: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    provisioningState: {
                      type: "string",
                    },
                    resourceGuid: {
                      type: "string",
                    },
                  },
                  required: ["networkManagerScopes"],
                },
                etag: {
                  type: "string",
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

export default NetworkManagers_ListBySubscription;
