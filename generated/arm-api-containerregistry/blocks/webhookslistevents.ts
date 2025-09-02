import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Webhooks_ListEvents: AppBlock = {
  name: "Webhooks / List Events",
  description: "Lists recent events for the specified webhook.",
  category: "Webhooks",
  inputs: {
    default: {
      config: {
        registryName: {
          name: "Registry Name",
          description: "Name of the registry",
          type: "string",
          required: true,
        },
        webhookName: {
          name: "Webhook Name",
          description: "Name of the webhook",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/${input.event.inputConfig.registryName}/webhooks/${input.event.inputConfig.webhookName}/listEvents` +
          "?api-version=2025-04-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
                eventRequestMessage: {
                  type: "object",
                  properties: {
                    content: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        timestamp: {
                          type: "string",
                        },
                        action: {
                          type: "string",
                        },
                        target: {
                          type: "object",
                          properties: {
                            mediaType: {
                              type: "string",
                            },
                            size: {
                              type: "integer",
                            },
                            digest: {
                              type: "string",
                            },
                            length: {
                              type: "integer",
                            },
                            repository: {
                              type: "string",
                            },
                            url: {
                              type: "string",
                            },
                            tag: {
                              type: "string",
                            },
                            name: {
                              type: "string",
                            },
                            version: {
                              type: "string",
                            },
                          },
                        },
                        request: {
                          type: "object",
                          properties: {
                            id: {
                              type: "string",
                            },
                            addr: {
                              type: "string",
                            },
                            host: {
                              type: "string",
                            },
                            method: {
                              type: "string",
                            },
                            useragent: {
                              type: "string",
                            },
                          },
                        },
                        actor: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                          },
                        },
                        source: {
                          type: "object",
                          properties: {
                            addr: {
                              type: "string",
                            },
                            instanceID: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                    headers: {
                      type: "object",
                      additionalProperties: true,
                    },
                    method: {
                      type: "string",
                    },
                    requestUri: {
                      type: "string",
                    },
                    version: {
                      type: "string",
                    },
                  },
                },
                eventResponseMessage: {
                  type: "object",
                  properties: {
                    content: {
                      type: "string",
                    },
                    headers: {
                      type: "object",
                      additionalProperties: true,
                    },
                    reasonPhrase: {
                      type: "string",
                    },
                    statusCode: {
                      type: "string",
                    },
                    version: {
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

export default Webhooks_ListEvents;
