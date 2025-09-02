import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const RestorableDroppedDatabases_Get: AppBlock = {
  name: "Restorable Dropped Databases / Get",
  description: "Gets a restorable dropped database.",
  category: "Restorable Dropped Databases",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        restorableDroppedDatabaseId: {
          name: "Restorable Dropped Database ID",
          description: "Unique identifier",
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
        $expand: {
          name: "Expand",
          description: "The child resources to include in the response.",
          type: "string",
          required: false,
        },
        $filter: {
          name: "Filter",
          description:
            "An OData filter expression that filters elements in the collection.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/restorableDroppedDatabases/${input.event.inputConfig.restorableDroppedDatabaseId}` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.$expand
            ? `&$expand=${input.event.inputConfig.$expand}`
            : "") +
          (input.event.inputConfig.$filter
            ? `&$filter=${input.event.inputConfig.$filter}`
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
          location: {
            type: "string",
          },
          tags: {
            type: "object",
            additionalProperties: true,
          },
          properties: {
            type: "object",
            properties: {
              databaseName: {
                type: "string",
              },
              maxSizeBytes: {
                type: "integer",
              },
              creationDate: {
                type: "string",
              },
              deletionDate: {
                type: "string",
              },
              earliestRestoreDate: {
                type: "string",
              },
              backupStorageRedundancy: {
                type: "string",
              },
              keys: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
        },
      },
    },
  },
};

export default RestorableDroppedDatabases_Get;
