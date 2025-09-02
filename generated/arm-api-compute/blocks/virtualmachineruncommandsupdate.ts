import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachineRunCommands_Update: AppBlock = {
  name: "Virtual Machine Run Commands / Update",
  description: "The operation to update the run command.",
  category: "Virtual Machine Run Commands",
  inputs: {
    default: {
      config: {
        vmName: {
          name: "VM Name",
          description: "Name of the vm",
          type: "string",
          required: true,
        },
        runCommandName: {
          name: "Run Command Name",
          description: "Name of the run command",
          type: "string",
          required: true,
        },
        runCommand: {
          name: "Run Command",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  source: {
                    type: "object",
                    properties: {
                      script: {
                        type: "string",
                      },
                      scriptUri: {
                        type: "string",
                      },
                      commandId: {
                        type: "string",
                      },
                      scriptUriManagedIdentity: {
                        type: "object",
                        properties: {
                          clientId: {
                            type: "string",
                          },
                          objectId: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                  parameters: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        value: {
                          type: "string",
                        },
                      },
                      required: ["name", "value"],
                    },
                  },
                  protectedParameters: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                  asyncExecution: {
                    type: "boolean",
                  },
                  runAsUser: {
                    type: "string",
                  },
                  runAsPassword: {
                    type: "string",
                  },
                  timeoutInSeconds: {
                    type: "number",
                  },
                  outputBlobUri: {
                    type: "string",
                  },
                  errorBlobUri: {
                    type: "string",
                  },
                  outputBlobManagedIdentity: {
                    type: "object",
                    properties: {
                      clientId: {
                        type: "object",
                        additionalProperties: true,
                      },
                      objectId: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                  },
                  errorBlobManagedIdentity: {
                    type: "object",
                    properties: {
                      clientId: {
                        type: "object",
                        additionalProperties: true,
                      },
                      objectId: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                  },
                  provisioningState: {
                    type: "string",
                  },
                  instanceView: {
                    type: "object",
                    properties: {
                      executionState: {
                        type: "string",
                      },
                      executionMessage: {
                        type: "string",
                      },
                      exitCode: {
                        type: "number",
                      },
                      output: {
                        type: "string",
                      },
                      error: {
                        type: "string",
                      },
                      startTime: {
                        type: "string",
                      },
                      endTime: {
                        type: "string",
                      },
                      statuses: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            code: {
                              type: "string",
                            },
                            level: {
                              type: "string",
                            },
                            displayStatus: {
                              type: "string",
                            },
                            message: {
                              type: "string",
                            },
                            time: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                  treatFailureAsDeploymentFailure: {
                    type: "boolean",
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
        const requestBody = input.event.inputConfig.runCommand;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${input.event.inputConfig.vmName}/runCommands/${input.event.inputConfig.runCommandName}` +
          "?api-version=2024-11-01";

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
          properties: {
            type: "object",
            properties: {
              source: {
                type: "object",
                properties: {
                  script: {
                    type: "string",
                  },
                  scriptUri: {
                    type: "string",
                  },
                  commandId: {
                    type: "string",
                  },
                  scriptUriManagedIdentity: {
                    type: "object",
                    properties: {
                      clientId: {
                        type: "string",
                      },
                      objectId: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              parameters: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    value: {
                      type: "string",
                    },
                  },
                  required: ["name", "value"],
                },
              },
              protectedParameters: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              asyncExecution: {
                type: "boolean",
              },
              runAsUser: {
                type: "string",
              },
              runAsPassword: {
                type: "string",
              },
              timeoutInSeconds: {
                type: "integer",
              },
              outputBlobUri: {
                type: "string",
              },
              errorBlobUri: {
                type: "string",
              },
              outputBlobManagedIdentity: {
                type: "object",
                properties: {
                  clientId: {
                    type: "object",
                    additionalProperties: true,
                  },
                  objectId: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              errorBlobManagedIdentity: {
                type: "object",
                properties: {
                  clientId: {
                    type: "object",
                    additionalProperties: true,
                  },
                  objectId: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              provisioningState: {
                type: "string",
              },
              instanceView: {
                type: "object",
                properties: {
                  executionState: {
                    type: "string",
                  },
                  executionMessage: {
                    type: "string",
                  },
                  exitCode: {
                    type: "integer",
                  },
                  output: {
                    type: "string",
                  },
                  error: {
                    type: "string",
                  },
                  startTime: {
                    type: "string",
                  },
                  endTime: {
                    type: "string",
                  },
                  statuses: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                        },
                        level: {
                          type: "string",
                        },
                        displayStatus: {
                          type: "string",
                        },
                        message: {
                          type: "string",
                        },
                        time: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              treatFailureAsDeploymentFailure: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
  },
};

export default VirtualMachineRunCommands_Update;
