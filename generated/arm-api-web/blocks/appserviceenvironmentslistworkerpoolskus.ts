import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceEnvironments_ListWorkerPoolSkus: AppBlock = {
  name: "App Service Environments / List Worker Pool Skus",
  description: "Description for Get available SKUs for scaling a worker pool.",
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
        workerPoolName: {
          name: "Worker Pool Name",
          description: "Name of the worker pool",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/${input.event.inputConfig.name}/workerPools/${input.event.inputConfig.workerPoolName}/skus` +
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                resourceType: {
                  type: "string",
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
                capacity: {
                  type: "object",
                  properties: {
                    minimum: {
                      type: "object",
                      additionalProperties: true,
                    },
                    maximum: {
                      type: "object",
                      additionalProperties: true,
                    },
                    elasticMaximum: {
                      type: "object",
                      additionalProperties: true,
                    },
                    default: {
                      type: "object",
                      additionalProperties: true,
                    },
                    scaleType: {
                      type: "object",
                      additionalProperties: true,
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
        required: ["value"],
      },
    },
  },
};

export default AppServiceEnvironments_ListWorkerPoolSkus;
