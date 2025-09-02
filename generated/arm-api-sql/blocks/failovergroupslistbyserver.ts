import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FailoverGroups_ListByServer: AppBlock = {
  name: "Failover Groups / List By Server",
  description: "Lists the failover groups in a server.",
  category: "Failover Groups",
  inputs: {
    default: {
      config: {
        serverName: {
          name: "Server Name",
          description: "Name of the server",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/failoverGroups` +
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
                    readWriteEndpoint: {
                      type: "object",
                      properties: {
                        failoverPolicy: {
                          type: "string",
                        },
                        failoverWithDataLossGracePeriodMinutes: {
                          type: "integer",
                        },
                      },
                      required: ["failoverPolicy"],
                    },
                    readOnlyEndpoint: {
                      type: "object",
                      properties: {
                        failoverPolicy: {
                          type: "string",
                        },
                        targetServer: {
                          type: "string",
                        },
                      },
                    },
                    replicationRole: {
                      type: "string",
                    },
                    replicationState: {
                      type: "string",
                    },
                    partnerServers: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                          },
                          location: {
                            type: "string",
                          },
                          replicationRole: {
                            type: "string",
                          },
                        },
                        required: ["id"],
                      },
                    },
                    databases: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    secondaryType: {
                      type: "string",
                    },
                  },
                  required: ["readWriteEndpoint", "partnerServers"],
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

export default FailoverGroups_ListByServer;
