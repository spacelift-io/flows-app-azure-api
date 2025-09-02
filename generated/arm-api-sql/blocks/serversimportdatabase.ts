import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Servers_ImportDatabase: AppBlock = {
  name: "Servers / Import Database",
  description: "Imports a bacpac into a new database.",
  category: "Servers",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              databaseName: {
                type: "string",
              },
              edition: {
                type: "string",
              },
              serviceObjectiveName: {
                type: "string",
              },
              maxSizeBytes: {
                type: "string",
              },
              storageKeyType: {
                type: "string",
              },
              storageKey: {
                type: "string",
              },
              storageUri: {
                type: "string",
              },
              administratorLogin: {
                type: "string",
              },
              administratorLoginPassword: {
                type: "string",
              },
              authenticationType: {
                type: "string",
              },
              networkIsolation: {
                type: "object",
                properties: {
                  storageAccountResourceId: {
                    type: "string",
                  },
                  sqlServerResourceId: {
                    type: "string",
                  },
                },
              },
            },
            required: [
              "storageKeyType",
              "storageKey",
              "storageUri",
              "administratorLogin",
              "administratorLoginPassword",
            ],
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/import` +
          "?api-version=2023-08-01";

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
          properties: {
            type: "object",
            properties: {
              requestId: {
                type: "string",
              },
              requestType: {
                type: "string",
              },
              queuedTime: {
                type: "string",
              },
              lastModifiedTime: {
                type: "string",
              },
              blobUri: {
                type: "string",
              },
              serverName: {
                type: "string",
              },
              databaseName: {
                type: "string",
              },
              status: {
                type: "string",
              },
              errorMessage: {
                type: "string",
              },
              privateEndpointConnections: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    privateLinkServiceId: {
                      type: "string",
                    },
                    privateEndpointConnectionName: {
                      type: "string",
                    },
                    status: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default Servers_ImportDatabase;
