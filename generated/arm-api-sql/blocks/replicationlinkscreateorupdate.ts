import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ReplicationLinks_CreateOrUpdate: AppBlock = {
  name: "Replication Links / Create Or Update",
  description: "Updates the replication link type.",
  category: "Replication Links",
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
        linkId: {
          name: "Link ID",
          description: "Unique identifier",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  partnerServer: {
                    type: "string",
                  },
                  partnerDatabase: {
                    type: "string",
                  },
                  partnerDatabaseId: {
                    type: "string",
                  },
                  partnerLocation: {
                    type: "string",
                  },
                  role: {
                    type: "string",
                  },
                  partnerRole: {
                    type: "string",
                  },
                  replicationMode: {
                    type: "string",
                  },
                  startTime: {
                    type: "string",
                  },
                  percentComplete: {
                    type: "number",
                  },
                  replicationState: {
                    type: "string",
                  },
                  isTerminationAllowed: {
                    type: "boolean",
                  },
                  linkType: {
                    type: "string",
                  },
                },
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/replicationLinks/${input.event.inputConfig.linkId}` +
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
              partnerServer: {
                type: "string",
              },
              partnerDatabase: {
                type: "string",
              },
              partnerDatabaseId: {
                type: "string",
              },
              partnerLocation: {
                type: "string",
              },
              role: {
                type: "string",
              },
              partnerRole: {
                type: "string",
              },
              replicationMode: {
                type: "string",
              },
              startTime: {
                type: "string",
              },
              percentComplete: {
                type: "integer",
              },
              replicationState: {
                type: "string",
              },
              isTerminationAllowed: {
                type: "boolean",
              },
              linkType: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default ReplicationLinks_CreateOrUpdate;
