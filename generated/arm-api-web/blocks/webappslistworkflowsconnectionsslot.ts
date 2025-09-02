import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_ListWorkflowsConnectionsSlot: AppBlock = {
  name: "Web Apps / List Workflows Connections Slot",
  description:
    "Lists logic app's connections for web site, or a deployment slot.",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        slot: {
          name: "Slot",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/listWorkflowsConnections` +
          "?api-version=2024-11-01";

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
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          type: {
            type: "string",
          },
          kind: {
            type: "string",
          },
          location: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              files: {
                type: "object",
                additionalProperties: true,
              },
              flowState: {
                type: "string",
              },
              health: {
                type: "object",
                properties: {
                  state: {
                    type: "string",
                  },
                  error: {
                    type: "object",
                    properties: {
                      extendedCode: {
                        type: "string",
                      },
                      messageTemplate: {
                        type: "string",
                      },
                      parameters: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                      innerErrors: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            extendedCode: {
                              type: "object",
                              additionalProperties: true,
                            },
                            messageTemplate: {
                              type: "object",
                              additionalProperties: true,
                            },
                            parameters: {
                              type: "object",
                              additionalProperties: true,
                            },
                            innerErrors: {
                              type: "object",
                              additionalProperties: true,
                            },
                            details: {
                              type: "array",
                              items: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                            target: {
                              type: "string",
                            },
                            code: {
                              type: "string",
                            },
                            message: {
                              type: "string",
                            },
                          },
                        },
                      },
                      details: {
                        type: "object",
                        additionalProperties: true,
                      },
                      target: {
                        type: "object",
                        additionalProperties: true,
                      },
                      code: {
                        type: "object",
                        additionalProperties: true,
                      },
                      message: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                  },
                },
                required: ["state"],
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_ListWorkflowsConnectionsSlot;
