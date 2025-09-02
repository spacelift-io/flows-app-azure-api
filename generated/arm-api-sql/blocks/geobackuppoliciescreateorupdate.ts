import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GeoBackupPolicies_CreateOrUpdate: AppBlock = {
  name: "Geo Backup Policies / Create Or Update",
  description: "Create or update a database default Geo backup policy.",
  category: "Geo Backup Policies",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        databaseName: {
          name: "Database Name",
          description: "Name of the database",
          type: "string",
          required: true,
        },
        geoBackupPolicyName: {
          name: "Geo Backup Policy Name",
          description: "Name of the geo backup policy",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              location: {
                type: "string",
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
                  storageType: {
                    type: "string",
                  },
                },
                required: ["state"],
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/geoBackupPolicies/${input.event.inputConfig.geoBackupPolicyName}` +
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
          location: {
            type: "string",
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
              storageType: {
                type: "string",
              },
            },
            required: ["state"],
          },
        },
      },
    },
  },
};

export default GeoBackupPolicies_CreateOrUpdate;
