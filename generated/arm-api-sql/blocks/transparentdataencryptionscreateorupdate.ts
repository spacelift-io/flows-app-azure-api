import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const TransparentDataEncryptions_CreateOrUpdate: AppBlock = {
  name: "Transparent Data Encryptions / Create Or Update",
  description:
    "Updates a logical database's transparent data encryption configuration.",
  category: "Transparent Data Encryptions",
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
        tdeName: {
          name: "Tde Name",
          description: "Name of the tde",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "The database transparent data encryption.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  state: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/transparentDataEncryption/${input.event.inputConfig.tdeName}` +
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
          properties: {
            type: "object",
            properties: {
              state: {
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

export default TransparentDataEncryptions_CreateOrUpdate;
