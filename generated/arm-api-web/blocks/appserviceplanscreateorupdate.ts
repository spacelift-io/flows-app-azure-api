import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServicePlans_CreateOrUpdate: AppBlock = {
  name: "App Service Plans / Create Or Update",
  description: "Description for Creates or updates an App Service Plan.",
  category: "App Service Plans",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        appServicePlan: {
          name: "App Service Plan",
          description: "Details of the App Service plan.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  workerTierName: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  subscription: {
                    type: "string",
                  },
                  hostingEnvironmentProfile: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                      type: {
                        type: "string",
                      },
                    },
                  },
                  maximumNumberOfWorkers: {
                    type: "number",
                  },
                  numberOfWorkers: {
                    type: "number",
                  },
                  geoRegion: {
                    type: "string",
                  },
                  perSiteScaling: {
                    type: "boolean",
                  },
                  elasticScaleEnabled: {
                    type: "boolean",
                  },
                  maximumElasticWorkerCount: {
                    type: "number",
                  },
                  numberOfSites: {
                    type: "number",
                  },
                  isSpot: {
                    type: "boolean",
                  },
                  spotExpirationTime: {
                    type: "string",
                  },
                  freeOfferExpirationTime: {
                    type: "string",
                  },
                  resourceGroup: {
                    type: "string",
                  },
                  reserved: {
                    type: "boolean",
                  },
                  isXenon: {
                    type: "boolean",
                  },
                  hyperV: {
                    type: "boolean",
                  },
                  targetWorkerCount: {
                    type: "number",
                  },
                  targetWorkerSizeId: {
                    type: "number",
                  },
                  provisioningState: {
                    type: "string",
                  },
                  kubeEnvironmentProfile: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                      type: {
                        type: "string",
                      },
                    },
                  },
                  zoneRedundant: {
                    type: "boolean",
                  },
                  asyncScalingEnabled: {
                    type: "boolean",
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
              extendedLocation: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  type: {
                    type: "string",
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
        const requestBody = input.event.inputConfig.appServicePlan;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/serverfarms/${input.event.inputConfig.name}` +
          "?api-version=2024-11-01";

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
              workerTierName: {
                type: "string",
              },
              status: {
                type: "string",
              },
              subscription: {
                type: "string",
              },
              hostingEnvironmentProfile: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                },
              },
              maximumNumberOfWorkers: {
                type: "integer",
              },
              numberOfWorkers: {
                type: "integer",
              },
              geoRegion: {
                type: "string",
              },
              perSiteScaling: {
                type: "boolean",
              },
              elasticScaleEnabled: {
                type: "boolean",
              },
              maximumElasticWorkerCount: {
                type: "integer",
              },
              numberOfSites: {
                type: "integer",
              },
              isSpot: {
                type: "boolean",
              },
              spotExpirationTime: {
                type: "string",
              },
              freeOfferExpirationTime: {
                type: "string",
              },
              resourceGroup: {
                type: "string",
              },
              reserved: {
                type: "boolean",
              },
              isXenon: {
                type: "boolean",
              },
              hyperV: {
                type: "boolean",
              },
              targetWorkerCount: {
                type: "integer",
              },
              targetWorkerSizeId: {
                type: "integer",
              },
              provisioningState: {
                type: "string",
              },
              kubeEnvironmentProfile: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                },
              },
              zoneRedundant: {
                type: "boolean",
              },
              asyncScalingEnabled: {
                type: "boolean",
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
          extendedLocation: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              type: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default AppServicePlans_CreateOrUpdate;
