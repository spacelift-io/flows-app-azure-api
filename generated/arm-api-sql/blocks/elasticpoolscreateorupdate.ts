import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ElasticPools_CreateOrUpdate: AppBlock = {
  name: "Elastic Pools / Create Or Update",
  description: "Creates or updates an elastic pool.",
  category: "Elastic Pools",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        elasticPoolName: {
          name: "Elastic Pool Name",
          description: "Name of the elastic pool",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
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
                },
                required: ["name"],
              },
              kind: {
                type: "string",
              },
              properties: {
                type: "object",
                properties: {
                  state: {
                    type: "string",
                  },
                  creationDate: {
                    type: "string",
                  },
                  maxSizeBytes: {
                    type: "number",
                  },
                  minCapacity: {
                    type: "number",
                  },
                  perDatabaseSettings: {
                    type: "object",
                    properties: {
                      minCapacity: {
                        type: "number",
                      },
                      maxCapacity: {
                        type: "number",
                      },
                      autoPauseDelay: {
                        type: "number",
                      },
                    },
                  },
                  zoneRedundant: {
                    type: "boolean",
                  },
                  licenseType: {
                    type: "string",
                  },
                  maintenanceConfigurationId: {
                    type: "string",
                  },
                  highAvailabilityReplicaCount: {
                    type: "number",
                  },
                  autoPauseDelay: {
                    type: "number",
                  },
                  preferredEnclaveType: {
                    type: "string",
                  },
                  availabilityZone: {
                    type: "string",
                  },
                },
              },
            },
            required: ["location"],
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/elasticPools/${input.event.inputConfig.elasticPoolName}` +
          "?api-version=2023-08-01";

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
            },
            required: ["name"],
          },
          kind: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              state: {
                type: "string",
              },
              creationDate: {
                type: "string",
              },
              maxSizeBytes: {
                type: "integer",
              },
              minCapacity: {
                type: "number",
              },
              perDatabaseSettings: {
                type: "object",
                properties: {
                  minCapacity: {
                    type: "number",
                  },
                  maxCapacity: {
                    type: "number",
                  },
                  autoPauseDelay: {
                    type: "integer",
                  },
                },
              },
              zoneRedundant: {
                type: "boolean",
              },
              licenseType: {
                type: "string",
              },
              maintenanceConfigurationId: {
                type: "string",
              },
              highAvailabilityReplicaCount: {
                type: "integer",
              },
              autoPauseDelay: {
                type: "integer",
              },
              preferredEnclaveType: {
                type: "string",
              },
              availabilityZone: {
                type: "string",
              },
            },
          },
        },
        required: ["location"],
      },
    },
  },
};

export default ElasticPools_CreateOrUpdate;
