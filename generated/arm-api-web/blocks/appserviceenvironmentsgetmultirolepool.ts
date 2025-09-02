import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceEnvironments_GetMultiRolePool: AppBlock = {
  name: "App Service Environments / Get Multi Role Pool",
  description: "Description for Get properties of a multi-role pool.",
  category: "App Service Environments",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/${input.event.inputConfig.name}/multiRolePools/default` +
          "?api-version=2024-11-01";

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
              workerSizeId: {
                type: "integer",
              },
              computeMode: {
                type: "string",
              },
              workerSize: {
                type: "string",
              },
              workerCount: {
                type: "integer",
              },
              instanceNames: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
          sku: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              tier: {
                type: "string",
              },
              size: {
                type: "string",
              },
              family: {
                type: "string",
              },
              capacity: {
                type: "integer",
              },
              skuCapacity: {
                type: "object",
                properties: {
                  minimum: {
                    type: "integer",
                  },
                  maximum: {
                    type: "integer",
                  },
                  elasticMaximum: {
                    type: "integer",
                  },
                  default: {
                    type: "integer",
                  },
                  scaleType: {
                    type: "string",
                  },
                },
              },
              locations: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              capabilities: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    value: {
                      type: "string",
                    },
                    reason: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default AppServiceEnvironments_GetMultiRolePool;
