import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AutoUpgradeProfiles_CreateOrUpdate: AppBlock = {
  name: "Auto Upgrade Profiles / Create Or Update",
  description: "Create a AutoUpgradeProfile",
  category: "Auto Upgrade Profiles",
  inputs: {
    default: {
      config: {
        fleetName: {
          name: "Fleet Name",
          description: "Name of the fleet",
          type: "string",
          required: true,
        },
        autoUpgradeProfileName: {
          name: "Auto Upgrade Profile Name",
          description: "Name of the auto upgrade profile",
          type: "string",
          required: true,
        },
        resource: {
          name: "Resource",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  provisioningState: {
                    type: "string",
                  },
                  updateStrategyId: {
                    type: "string",
                  },
                  channel: {
                    type: "string",
                  },
                  nodeImageSelection: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                      },
                    },
                    required: ["type"],
                  },
                  disabled: {
                    type: "boolean",
                  },
                  autoUpgradeProfileStatus: {
                    type: "object",
                    properties: {
                      lastTriggeredAt: {
                        type: "string",
                      },
                      lastTriggerStatus: {
                        type: "string",
                      },
                      lastTriggerError: {
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
                      lastTriggerUpgradeVersions: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
                required: ["channel"],
              },
              eTag: {
                type: "string",
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
        If_None_Match: {
          name: "If None Match",
          description:
            "The request should only proceed if no entity matches this string.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.resource;
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.If_Match) {
          additionalHeaders["If-Match"] = String(
            input.event.inputConfig.If_Match,
          );
        }
        if (input.event.inputConfig.If_None_Match) {
          additionalHeaders["If-None-Match"] = String(
            input.event.inputConfig.If_None_Match,
          );
        }

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/fleets/${input.event.inputConfig.fleetName}/autoUpgradeProfiles/${input.event.inputConfig.autoUpgradeProfileName}` +
          "?api-version=2025-03-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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
              provisioningState: {
                type: "string",
              },
              updateStrategyId: {
                type: "string",
              },
              channel: {
                type: "string",
              },
              nodeImageSelection: {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                  },
                },
                required: ["type"],
              },
              disabled: {
                type: "boolean",
              },
              autoUpgradeProfileStatus: {
                type: "object",
                properties: {
                  lastTriggeredAt: {
                    type: "string",
                  },
                  lastTriggerStatus: {
                    type: "string",
                  },
                  lastTriggerError: {
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
                  lastTriggerUpgradeVersions: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
            },
            required: ["channel"],
          },
          eTag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default AutoUpgradeProfiles_CreateOrUpdate;
