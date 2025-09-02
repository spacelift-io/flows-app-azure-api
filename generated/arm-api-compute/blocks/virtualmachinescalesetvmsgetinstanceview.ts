import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachineScaleSetVMs_GetInstanceView: AppBlock = {
  name: "Virtual Machine Scale Set V Ms / Get Instance View",
  description: "Gets the status of a virtual machine from a VM scale set.",
  category: "Virtual Machine Scale Set V Ms",
  inputs: {
    default: {
      config: {
        vmScaleSetName: {
          name: "VM Scale Set Name",
          description: "Name of the vm scale set",
          type: "string",
          required: true,
        },
        instanceId: {
          name: "Instance ID",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/${input.event.inputConfig.vmScaleSetName}/virtualMachines/${input.event.inputConfig.instanceId}/instanceView` +
          "?api-version=2024-11-01";

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
          platformUpdateDomain: {
            type: "integer",
          },
          platformFaultDomain: {
            type: "integer",
          },
          rdpThumbPrint: {
            type: "string",
          },
          vmAgent: {
            type: "object",
            properties: {
              vmAgentVersion: {
                type: "string",
              },
              extensionHandlers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                    },
                    typeHandlerVersion: {
                      type: "string",
                    },
                    status: {
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
              statuses: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: {
                      type: "object",
                      additionalProperties: true,
                    },
                    level: {
                      type: "object",
                      additionalProperties: true,
                    },
                    displayStatus: {
                      type: "object",
                      additionalProperties: true,
                    },
                    message: {
                      type: "object",
                      additionalProperties: true,
                    },
                    time: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
              },
            },
          },
          maintenanceRedeployStatus: {
            type: "object",
            properties: {
              isCustomerInitiatedMaintenanceAllowed: {
                type: "boolean",
              },
              preMaintenanceWindowStartTime: {
                type: "string",
              },
              preMaintenanceWindowEndTime: {
                type: "string",
              },
              maintenanceWindowStartTime: {
                type: "string",
              },
              maintenanceWindowEndTime: {
                type: "string",
              },
              lastOperationResultCode: {
                type: "string",
              },
              lastOperationMessage: {
                type: "string",
              },
            },
          },
          disks: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                encryptionSettings: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      diskEncryptionKey: {
                        type: "object",
                        properties: {
                          secretUrl: {
                            type: "string",
                          },
                          sourceVault: {
                            type: "object",
                            properties: {
                              id: {
                                type: "string",
                              },
                            },
                          },
                        },
                        required: ["secretUrl", "sourceVault"],
                      },
                      keyEncryptionKey: {
                        type: "object",
                        properties: {
                          keyUrl: {
                            type: "string",
                          },
                          sourceVault: {
                            type: "object",
                            properties: {
                              id: {
                                type: "object",
                                additionalProperties: true,
                              },
                            },
                          },
                        },
                        required: ["keyUrl", "sourceVault"],
                      },
                      enabled: {
                        type: "boolean",
                      },
                    },
                  },
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
          },
          extensions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                typeHandlerVersion: {
                  type: "string",
                },
                substatuses: {
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
                statuses: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
            },
          },
          vmHealth: {
            type: "object",
            properties: {
              status: {
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
          bootDiagnostics: {
            type: "object",
            properties: {
              consoleScreenshotBlobUri: {
                type: "string",
              },
              serialConsoleLogBlobUri: {
                type: "string",
              },
              status: {
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
          assignedHost: {
            type: "string",
          },
          placementGroupId: {
            type: "string",
          },
          computerName: {
            type: "string",
          },
          osName: {
            type: "string",
          },
          osVersion: {
            type: "string",
          },
          hyperVGeneration: {
            type: "string",
          },
        },
      },
    },
  },
};

export default VirtualMachineScaleSetVMs_GetInstanceView;
