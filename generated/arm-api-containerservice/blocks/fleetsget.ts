import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Fleets_Get: AppBlock = {
  name: "Fleets / Get",
  description: "Gets a Fleet.",
  category: "Fleets",
  inputs: {
    default: {
      config: {
        fleetName: {
          name: "Fleet Name",
          description: "Name of the fleet",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/fleets/${input.event.inputConfig.fleetName}` +
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
  },
};

export default Fleets_Get;
