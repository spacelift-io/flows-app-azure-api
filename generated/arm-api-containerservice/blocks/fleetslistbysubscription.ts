import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Fleets_ListBySubscription: AppBlock = {
  name: "Fleets / List By Subscription",
  description: "Lists fleets in the specified subscription.",
  category: "Fleets",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.ContainerService/fleets` +
          "?api-version=2025-03-01";

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
                    hubProfile: {
                      type: "object",
                      properties: {
                        dnsPrefix: {
                          type: "string",
                        },
                        apiServerAccessProfile: {
                          type: "object",
                          properties: {
                            enablePrivateCluster: {
                              type: "boolean",
                            },
                            enableVnetIntegration: {
                              type: "boolean",
                            },
                            subnetId: {
                              type: "string",
                            },
                          },
                        },
                        agentProfile: {
                          type: "object",
                          properties: {
                            subnetId: {
                              type: "string",
                            },
                            vmSize: {
                              type: "string",
                            },
                          },
                        },
                        fqdn: {
                          type: "string",
                        },
                        kubernetesVersion: {
                          type: "string",
                        },
                        portalFqdn: {
                          type: "string",
                        },
                      },
                    },
                    status: {
                      type: "object",
                      properties: {
                        lastOperationId: {
                          type: "string",
                        },
                        lastOperationError: {
                          type: "object",
                          properties: {
                            code: {
                              type: "string",
                            },
                            message: {
                              type: "string",
                            },
                            target: {
                              type: "string",
                            },
                            details: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  code: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  message: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  target: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  details: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  additionalInfo: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      properties: {
                                        type: {
                                          type: "string",
                                        },
                                        info: {
                                          type: "object",
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                            additionalInfo: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
                eTag: {
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
                  required: ["type"],
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default Fleets_ListBySubscription;
