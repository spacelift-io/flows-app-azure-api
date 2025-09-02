import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachines_InstanceView: AppBlock = {
  name: "Virtual Machines / Instance View",
  description:
    "Retrieves information about the run-time state of a virtual machine.",
  category: "Virtual Machines",
  inputs: {
    default: {
      config: {
        vmName: {
          name: "VM Name",
          description: "Name of the vm",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${input.event.inputConfig.vmName}/instanceView` +
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
          assignedHost: {
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
          patchStatus: {
            type: "object",
            properties: {
              availablePatchSummary: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                  },
                  assessmentActivityId: {
                    type: "string",
                  },
                  rebootPending: {
                    type: "boolean",
                  },
                  criticalAndSecurityPatchCount: {
                    type: "integer",
                  },
                  otherPatchCount: {
                    type: "integer",
                  },
                  startTime: {
                    type: "string",
                  },
                  lastModifiedTime: {
                    type: "string",
                  },
                  error: {
                    type: "object",
                    properties: {
                      details: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            code: {
                              type: "string",
                            },
                            target: {
                              type: "string",
                            },
                            message: {
                              type: "string",
                            },
                          },
                        },
                      },
                      innererror: {
                        type: "object",
                        properties: {
                          exceptiontype: {
                            type: "string",
                          },
                          errordetail: {
                            type: "string",
                          },
                        },
                      },
                      code: {
                        type: "string",
                      },
                      target: {
                        type: "string",
                      },
                      message: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              lastPatchInstallationSummary: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                  },
                  installationActivityId: {
                    type: "string",
                  },
                  maintenanceWindowExceeded: {
                    type: "boolean",
                  },
                  notSelectedPatchCount: {
                    type: "integer",
                  },
                  excludedPatchCount: {
                    type: "integer",
                  },
                  pendingPatchCount: {
                    type: "integer",
                  },
                  installedPatchCount: {
                    type: "integer",
                  },
                  failedPatchCount: {
                    type: "integer",
                  },
                  startTime: {
                    type: "string",
                  },
                  lastModifiedTime: {
                    type: "string",
                  },
                  error: {
                    type: "object",
                    properties: {
                      details: {
                        type: "object",
                        additionalProperties: true,
                      },
                      innererror: {
                        type: "object",
                        additionalProperties: true,
                      },
                      code: {
                        type: "object",
                        additionalProperties: true,
                      },
                      target: {
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
              },
              configurationStatuses: {
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
          isVMInStandbyPool: {
            type: "boolean",
          },
        },
      },
    },
  },
};

export default VirtualMachines_InstanceView;
