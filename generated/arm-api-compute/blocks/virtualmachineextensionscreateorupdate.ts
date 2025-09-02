import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachineExtensions_CreateOrUpdate: AppBlock = {
  name: "Virtual Machine Extensions / Create Or Update",
  description: "The operation to create or update the extension.",
  category: "Virtual Machine Extensions",
  inputs: {
    default: {
      config: {
        vmName: {
          name: "VM Name",
          description: "Name of the vm",
          type: "string",
          required: true,
        },
        vmExtensionName: {
          name: "VM Extension Name",
          description: "Name of the vm extension",
          type: "string",
          required: true,
        },
        extensionParameters: {
          name: "Extension Parameters",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  forceUpdateTag: {
                    type: "string",
                  },
                  publisher: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                  typeHandlerVersion: {
                    type: "string",
                  },
                  autoUpgradeMinorVersion: {
                    type: "boolean",
                  },
                  enableAutomaticUpgrade: {
                    type: "boolean",
                  },
                  settings: {
                    type: "string",
                  },
                  protectedSettings: {
                    type: "string",
                  },
                  provisioningState: {
                    type: "string",
                  },
                  instanceView: {
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
                  suppressFailures: {
                    type: "boolean",
                  },
                  protectedSettingsFromKeyVault: {
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
                  provisionAfterExtensions: {
                    type: "array",
                    items: {
                      type: "string",
                    },
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
        const requestBody = input.event.inputConfig.extensionParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${input.event.inputConfig.vmName}/extensions/${input.event.inputConfig.vmExtensionName}` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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
              forceUpdateTag: {
                type: "string",
              },
              publisher: {
                type: "string",
              },
              type: {
                type: "string",
              },
              typeHandlerVersion: {
                type: "string",
              },
              autoUpgradeMinorVersion: {
                type: "boolean",
              },
              enableAutomaticUpgrade: {
                type: "boolean",
              },
              settings: {
                type: "object",
              },
              protectedSettings: {
                type: "object",
              },
              provisioningState: {
                type: "string",
              },
              instanceView: {
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
              suppressFailures: {
                type: "boolean",
              },
              protectedSettingsFromKeyVault: {
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
              provisionAfterExtensions: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default VirtualMachineExtensions_CreateOrUpdate;
