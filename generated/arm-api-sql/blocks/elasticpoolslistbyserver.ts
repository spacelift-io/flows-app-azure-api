import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ElasticPools_ListByServer: AppBlock = {
  name: "Elastic Pools / List By Server",
  description: "Gets all elastic pools in a server.",
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
        $skip: {
          name: "Skip",
          description: "The number of elements in the collection to skip.",
          type: "number",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/elasticPools` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.$skip
            ? `&$skip=${input.event.inputConfig.$skip}`
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ElasticPools_ListByServer;
