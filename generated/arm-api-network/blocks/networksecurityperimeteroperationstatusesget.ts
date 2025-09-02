import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkSecurityPerimeterOperationStatuses_Get: AppBlock = {
  name: "Network Security Perimeter Operation Statuses / Get",
  description: "Gets the operation status for the given operation id.",
  category: "Network Security Perimeter Operation Statuses",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        operationId: {
          name: "Operation ID",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Network/locations/${input.event.inputConfig.location}/networkSecurityPerimeterOperationStatuses/${input.event.inputConfig.operationId}` +
          "?api-version=2024-10-01";

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
          id: {
            type: "string",
          },
          resourceId: {
            type: "string",
          },
          name: {
            type: "string",
          },
          status: {
            type: "string",
          },
          percentComplete: {
            type: "number",
          },
          startTime: {
            type: "string",
          },
          endTime: {
            type: "string",
          },
          operations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                },
                resourceId: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                status: {
                  type: "string",
                },
                percentComplete: {
                  type: "number",
                },
                startTime: {
                  type: "string",
                },
                endTime: {
                  type: "string",
                },
                operations: {
                  type: "object",
                  additionalProperties: true,
                },
                error: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                    },
                    message: {
                      type: "string",
                    },
                    target: {
                      type: "string",
                    },
                    details: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          code: {
                            type: "object",
                            additionalProperties: true,
                          },
                          message: {
                            type: "object",
                            additionalProperties: true,
                          },
                          target: {
                            type: "object",
                            additionalProperties: true,
                          },
                          details: {
                            type: "object",
                            additionalProperties: true,
                          },
                          additionalInfo: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                type: {
                                  type: "string",
                                },
                                info: {
                                  type: "object",
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    additionalInfo: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
              },
              required: ["status"],
            },
          },
          error: {
            type: "object",
            properties: {
              code: {
                type: "string",
              },
              message: {
                type: "string",
              },
              target: {
                type: "string",
              },
              details: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: {
                      type: "object",
                      additionalProperties: true,
                    },
                    message: {
                      type: "object",
                      additionalProperties: true,
                    },
                    target: {
                      type: "object",
                      additionalProperties: true,
                    },
                    details: {
                      type: "object",
                      additionalProperties: true,
                    },
                    additionalInfo: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          type: {
                            type: "string",
                          },
                          info: {
                            type: "object",
                          },
                        },
                      },
                    },
                  },
                },
              },
              additionalInfo: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
        },
        required: ["status"],
      },
    },
  },
};

export default NetworkSecurityPerimeterOperationStatuses_Get;
