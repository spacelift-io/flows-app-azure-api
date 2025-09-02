import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FleetMembers_Update: AppBlock = {
  name: "Fleet Members / Update",
  description: "Update a FleetMember",
  category: "Fleet Members",
  inputs: {
    default: {
      config: {
        fleetName: {
          name: "Fleet Name",
          description: "Name of the fleet",
          type: "string",
          required: true,
        },
        fleetMemberName: {
          name: "Fleet Member Name",
          description: "Name of the fleet member",
          type: "string",
          required: true,
        },
        properties: {
          name: "Properties",
          description: "The resource properties to be updated.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  group: {
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
        If_Match: {
          name: "If Match",
          description:
            "The request should only proceed if an entity matches this string.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.properties;
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.If_Match) {
          additionalHeaders["If-Match"] = String(
            input.event.inputConfig.If_Match,
          );
        }

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/fleets/${input.event.inputConfig.fleetName}/members/${input.event.inputConfig.fleetMemberName}` +
          "?api-version=2025-03-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
          requestBody,
          additionalHeaders,
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
              clusterResourceId: {
                type: "string",
              },
              group: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
              status: {
                type: "object",
                properties: {
                  lastOperationId: {
                    type: "string",
                  },
                  lastOperationError: {
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
              },
            },
            required: ["clusterResourceId"],
          },
          eTag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default FleetMembers_Update;
