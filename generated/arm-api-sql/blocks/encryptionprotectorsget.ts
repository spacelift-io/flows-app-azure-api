import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const EncryptionProtectors_Get: AppBlock = {
  name: "Encryption Protectors / Get",
  description: "Gets a server encryption protector.",
  category: "Encryption Protectors",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        encryptionProtectorName: {
          name: "Encryption Protector Name",
          description: "Name of the encryption protector",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/encryptionProtector/${input.event.inputConfig.encryptionProtectorName}` +
          "?api-version=2023-08-01";

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
          kind: {
            type: "string",
          },
          location: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              subregion: {
                type: "string",
              },
              serverKeyName: {
                type: "string",
              },
              serverKeyType: {
                type: "string",
              },
              uri: {
                type: "string",
              },
              thumbprint: {
                type: "string",
              },
              autoRotationEnabled: {
                type: "boolean",
              },
            },
            required: ["serverKeyType"],
          },
        },
      },
    },
  },
};

export default EncryptionProtectors_Get;
