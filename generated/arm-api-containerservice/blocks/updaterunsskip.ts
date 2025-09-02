import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const UpdateRuns_Skip: AppBlock = {
  name: "Update Runs / Skip",
  description:
    "Skips one or a combination of member/group/stage/afterStageWait(s) of an update run.",
  category: "Update Runs",
  inputs: {
    default: {
      config: {
        fleetName: {
          name: "Fleet Name",
          description: "Name of the fleet",
          type: "string",
          required: true,
        },
        updateRunName: {
          name: "Update Run Name",
          description: "Name of the update run",
          type: "string",
          required: true,
        },
        body: {
          name: "Body",
          description: "The content of the action request",
          type: {
            type: "object",
            properties: {
              targets: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                    },
                    name: {
                      type: "string",
                    },
                  },
                  required: ["type", "name"],
                },
              },
            },
            required: ["targets"],
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
        const requestBody = input.event.inputConfig.body;
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.If_Match) {
          additionalHeaders["If-Match"] = String(
            input.event.inputConfig.If_Match,
          );
        }

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerService/fleets/${input.event.inputConfig.fleetName}/updateRuns/${input.event.inputConfig.updateRunName}/skip` +
          "?api-version=2025-03-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
              strategy: {
                type: "object",
                properties: {
                  stages: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        groups: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                              },
                            },
                            required: ["name"],
                          },
                        },
                        afterStageWaitInSeconds: {
                          type: "integer",
                        },
                      },
                      required: ["name"],
                    },
                  },
                },
                required: ["stages"],
              },
              managedClusterUpdate: {
                type: "object",
                properties: {
                  upgrade: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                      },
                      kubernetesVersion: {
                        type: "string",
                      },
                    },
                    required: ["type"],
                  },
                  nodeImageSelection: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                      },
                      customNodeImageVersions: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            version: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                    required: ["type"],
                  },
                },
                required: ["upgrade"],
              },
              status: {
                type: "object",
                properties: {
                  status: {
                    type: "object",
                    properties: {
                      startTime: {
                        type: "string",
                      },
                      completedTime: {
                        type: "string",
                      },
                      state: {
                        type: "string",
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
                  },
                  stages: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        status: {
                          type: "object",
                          properties: {
                            startTime: {
                              type: "object",
                              additionalProperties: true,
                            },
                            completedTime: {
                              type: "object",
                              additionalProperties: true,
                            },
                            state: {
                              type: "object",
                              additionalProperties: true,
                            },
                            error: {
                              type: "object",
                              additionalProperties: true,
                            },
                          },
                        },
                        name: {
                          type: "string",
                        },
                        groups: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              status: {
                                type: "object",
                                properties: {
                                  startTime: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  completedTime: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  state: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                  error: {
                                    type: "object",
                                    additionalProperties: true,
                                  },
                                },
                              },
                              name: {
                                type: "string",
                              },
                              members: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    status: {
                                      type: "object",
                                      properties: {
                                        startTime: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        completedTime: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        state: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        error: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                    },
                                    name: {
                                      type: "string",
                                    },
                                    clusterResourceId: {
                                      type: "string",
                                    },
                                    operationId: {
                                      type: "string",
                                    },
                                    message: {
                                      type: "string",
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                        afterStageWaitStatus: {
                          type: "object",
                          properties: {
                            status: {
                              type: "object",
                              properties: {
                                startTime: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                completedTime: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                state: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                                error: {
                                  type: "object",
                                  additionalProperties: true,
                                },
                              },
                            },
                            waitDurationInSeconds: {
                              type: "integer",
                            },
                          },
                        },
                      },
                    },
                  },
                  nodeImageSelection: {
                    type: "object",
                    properties: {
                      selectedNodeImageVersions: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: true,
                        },
                      },
                    },
                  },
                },
              },
              autoUpgradeProfileId: {
                type: "string",
              },
            },
            required: ["managedClusterUpdate"],
          },
          eTag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default UpdateRuns_Skip;
