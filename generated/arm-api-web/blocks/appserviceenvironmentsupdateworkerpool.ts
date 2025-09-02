import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceEnvironments_UpdateWorkerPool: AppBlock = {
  name: "App Service Environments / Update Worker Pool",
  description: "Description for Create or update a worker pool.",
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
        workerPoolEnvelope: {
          name: "Worker Pool Envelope",
          description: "Properties of the worker pool.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  workerSizeId: {
                    type: "number",
                  },
                  computeMode: {
                    type: "string",
                  },
                  workerSize: {
                    type: "string",
                  },
                  workerCount: {
                    type: "number",
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
                    type: "number",
                  },
                  skuCapacity: {
                    type: "object",
                    properties: {
                      minimum: {
                        type: "number",
                      },
                      maximum: {
                        type: "number",
                      },
                      elasticMaximum: {
                        type: "number",
                      },
                      default: {
                        type: "number",
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
        const requestBody = input.event.inputConfig.workerPoolEnvelope;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/${input.event.inputConfig.name}/workerPools/${input.event.inputConfig.workerPoolName}` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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

export default AppServiceEnvironments_UpdateWorkerPool;
