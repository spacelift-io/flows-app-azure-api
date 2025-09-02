import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Pools_CreateOrUpdate: AppBlock = {
  name: "Pools / Create Or Update",
  description: "Create a Pool",
  category: "Pools",
  inputs: {
    default: {
      config: {
        poolName: {
          name: "Pool Name",
          description: "Name of the pool",
          type: "string",
          required: true,
        },
        resource: {
          name: "Resource",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  provisioningState: {
                    type: "string",
                  },
                  maximumConcurrency: {
                    type: "number",
                  },
                  organizationProfile: {
                    type: "object",
                    properties: {
                      kind: {
                        type: "string",
                      },
                    },
                    required: ["kind"],
                  },
                  agentProfile: {
                    type: "object",
                    properties: {
                      kind: {
                        type: "string",
                      },
                      resourcePredictions: {
                        type: "object",
                      },
                      resourcePredictionsProfile: {
                        type: "object",
                        properties: {
                          kind: {
                            type: "string",
                          },
                        },
                        required: ["kind"],
                      },
                    },
                    required: ["kind"],
                  },
                  fabricProfile: {
                    type: "object",
                    properties: {
                      kind: {
                        type: "string",
                      },
                    },
                    required: ["kind"],
                  },
                  devCenterProjectResourceId: {
                    type: "string",
                  },
                },
                required: [
                  "maximumConcurrency",
                  "organizationProfile",
                  "agentProfile",
                  "fabricProfile",
                  "devCenterProjectResourceId",
                ],
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
        const requestBody = input.event.inputConfig.resource;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools/${input.event.inputConfig.poolName}` +
          "?api-version=2025-01-21";

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
              provisioningState: {
                type: "string",
              },
              maximumConcurrency: {
                type: "integer",
              },
              organizationProfile: {
                type: "object",
                properties: {
                  kind: {
                    type: "string",
                  },
                },
                required: ["kind"],
              },
              agentProfile: {
                type: "object",
                properties: {
                  kind: {
                    type: "string",
                  },
                  resourcePredictions: {
                    type: "object",
                  },
                  resourcePredictionsProfile: {
                    type: "object",
                    properties: {
                      kind: {
                        type: "string",
                      },
                    },
                    required: ["kind"],
                  },
                },
                required: ["kind"],
              },
              fabricProfile: {
                type: "object",
                properties: {
                  kind: {
                    type: "string",
                  },
                },
                required: ["kind"],
              },
              devCenterProjectResourceId: {
                type: "string",
              },
            },
            required: [
              "maximumConcurrency",
              "organizationProfile",
              "agentProfile",
              "fabricProfile",
              "devCenterProjectResourceId",
            ],
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

export default Pools_CreateOrUpdate;
