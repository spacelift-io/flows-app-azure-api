import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ReplicationLinks_ListByDatabase: AppBlock = {
  name: "Replication Links / List By Database",
  description: "Gets a list of replication links on database.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/databases/${input.event.inputConfig.databaseName}/replicationLinks` +
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
          value: {
            type: "array",
            items: {
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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ReplicationLinks_ListByDatabase;
