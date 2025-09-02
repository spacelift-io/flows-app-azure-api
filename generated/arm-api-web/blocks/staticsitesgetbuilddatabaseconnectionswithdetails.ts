import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StaticSites_GetBuildDatabaseConnectionsWithDetails: AppBlock = {
  name: "Static Sites / Get Build Database Connections With Details",
  description:
    "Returns details of database connections for a static site build",
  category: "Static Sites",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        environmentName: {
          name: "Environment Name",
          description: "Name of the environment",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/staticSites/${input.event.inputConfig.name}/builds/${input.event.inputConfig.environmentName}/showDatabaseConnections` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
                    resourceId: {
                      type: "string",
                    },
                    connectionIdentity: {
                      type: "string",
                    },
                    connectionString: {
                      type: "string",
                    },
                    region: {
                      type: "string",
                    },
                    configurationFiles: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          fileName: {
                            type: "string",
                          },
                          contents: {
                            type: "string",
                          },
                          type: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                  required: ["resourceId", "region"],
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

export default StaticSites_GetBuildDatabaseConnectionsWithDetails;
