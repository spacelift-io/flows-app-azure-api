import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StaticSites_CreateOrUpdateDatabaseConnection: AppBlock = {
  name: "Static Sites / Create Or Update Database Connection",
  description:
    "Description for Create or update a database connection for a static site",
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
        databaseConnectionName: {
          name: "Database Connection Name",
          description: "Name of the database connection",
          type: "string",
          required: true,
        },
        databaseConnectionRequestEnvelope: {
          name: "Database Connection Request Envelope",
          description:
            "A JSON representation of the database connection request properties",
          type: {
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
        const requestBody =
          input.event.inputConfig.databaseConnectionRequestEnvelope;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/staticSites/${input.event.inputConfig.name}/databaseConnections/${input.event.inputConfig.databaseConnectionName}` +
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
  },
};

export default StaticSites_CreateOrUpdateDatabaseConnection;
