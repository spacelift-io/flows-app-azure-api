import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FailoverGroups_Update: AppBlock = {
  name: "Failover Groups / Update",
  description: "Updates a failover group.",
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
        failoverGroupName: {
          name: "Failover Group Name",
          description: "Name of the failover group",
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
                  readWriteEndpoint: {
                    type: "object",
                    properties: {
                      failoverPolicy: {
                        type: "string",
                      },
                      failoverWithDataLossGracePeriodMinutes: {
                        type: "number",
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
                  databases: {
                    type: "array",
                    items: {
                      type: "string",
                    },
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
                  secondaryType: {
                    type: "string",
                  },
                },
              },
              tags: {
                type: "object",
                additionalProperties: true,
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/servers/${input.event.inputConfig.serverName}/failoverGroups/${input.event.inputConfig.failoverGroupName}` +
          "?api-version=2023-08-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
  },
};

export default FailoverGroups_Update;
