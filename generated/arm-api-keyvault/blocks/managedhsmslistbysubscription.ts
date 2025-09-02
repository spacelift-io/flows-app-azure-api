import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedHsms_ListBySubscription: AppBlock = {
  name: "Managed Hsms / List By Subscription",
  description:
    "The List operation gets information about the managed HSM Pools associated with the subscription.",
  category: "Managed Hsms",
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
          description: "Maximum number of results to return.",
          type: "number",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.KeyVault/managedHSMs` +
          "?api-version=2023-07-01" +
          (input.event.inputConfig.$top
            ? `&$top=${input.event.inputConfig.$top}`
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
                    tenantId: {
                      type: "string",
                    },
                    initialAdminObjectIds: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    hsmUri: {
                      type: "string",
                    },
                    enableSoftDelete: {
                      type: "boolean",
                    },
                    softDeleteRetentionInDays: {
                      type: "integer",
                    },
                    enablePurgeProtection: {
                      type: "boolean",
                    },
                    createMode: {
                      type: "string",
                    },
                    statusMessage: {
                      type: "string",
                    },
                    provisioningState: {
                      type: "string",
                    },
                    networkAcls: {
                      type: "object",
                      properties: {
                        bypass: {
                          type: "string",
                        },
                        defaultAction: {
                          type: "string",
                        },
                        ipRules: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              value: {
                                type: "string",
                              },
                            },
                            required: ["value"],
                          },
                        },
                        virtualNetworkRules: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                            },
                            required: ["id"],
                          },
                        },
                      },
                    },
                    regions: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: {
                            type: "string",
                          },
                          provisioningState: {
                            type: "string",
                          },
                          isPrimary: {
                            type: "boolean",
                          },
                        },
                      },
                    },
                    privateEndpointConnections: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                          etag: {
                            type: "string",
                          },
                          properties: {
                            type: "object",
                            properties: {
                              privateEndpoint: {
                                type: "object",
                                properties: {
                                  id: {
                                    type: "string",
                                  },
                                },
                              },
                              privateLinkServiceConnectionState: {
                                type: "object",
                                properties: {
                                  status: {
                                    type: "string",
                                  },
                                  description: {
                                    type: "string",
                                  },
                                  actionsRequired: {
                                    type: "string",
                                  },
                                },
                              },
                              provisioningState: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                    },
                    publicNetworkAccess: {
                      type: "string",
                    },
                    scheduledPurgeDate: {
                      type: "string",
                    },
                    securityDomainProperties: {
                      type: "object",
                      properties: {
                        activationStatus: {
                          type: "string",
                        },
                        activationStatusMessage: {
                          type: "string",
                        },
                      },
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

export default ManagedHsms_ListBySubscription;
