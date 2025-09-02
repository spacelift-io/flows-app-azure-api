import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Pools_ListByResourceGroup: AppBlock = {
  name: "Pools / List By Resource Group",
  description: "List Pool resources by resource group",
  category: "Pools",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools` +
          "?api-version=2025-01-21";

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
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default Pools_ListByResourceGroup;
