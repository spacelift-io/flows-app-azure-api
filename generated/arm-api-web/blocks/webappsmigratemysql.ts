import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_MigrateMySql: AppBlock = {
  name: "Web Apps / Migrate My Sql",
  description:
    "Description for Migrates a local (in-app) MySql database to a remote MySql database.",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        migrationRequestEnvelope: {
          name: "Migration Request Envelope",
          description: "MySql migration options.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  connectionString: {
                    type: "string",
                  },
                  migrationType: {
                    type: "string",
                  },
                },
                required: ["connectionString", "migrationType"],
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
        const requestBody = input.event.inputConfig.migrationRequestEnvelope;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/migratemysql` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          status: {
            type: "string",
          },
          errors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                extendedCode: {
                  type: "string",
                },
                messageTemplate: {
                  type: "string",
                },
                parameters: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                innerErrors: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                details: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
                target: {
                  type: "string",
                },
                code: {
                  type: "string",
                },
                message: {
                  type: "string",
                },
              },
            },
          },
          createdTime: {
            type: "string",
          },
          modifiedTime: {
            type: "string",
          },
          expirationTime: {
            type: "string",
          },
          geoMasterOperationId: {
            type: "string",
          },
        },
      },
    },
  },
};

export default WebApps_MigrateMySql;
