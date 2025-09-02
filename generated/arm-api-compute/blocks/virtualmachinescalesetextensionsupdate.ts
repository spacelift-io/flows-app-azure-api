import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachineScaleSetExtensions_Update: AppBlock = {
  name: "Virtual Machine Scale Set Extensions / Update",
  description: "The operation to update an extension.",
  category: "Virtual Machine Scale Set Extensions",
  inputs: {
    default: {
      config: {
        vmScaleSetName: {
          name: "VM Scale Set Name",
          description: "Name of the vm scale set",
          type: "string",
          required: true,
        },
        vmssExtensionName: {
          name: "Vmss Extension Name",
          description: "Name of the vmss extension",
          type: "string",
          required: true,
        },
        extensionParameters: {
          name: "Extension Parameters",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              type: {
                type: "string",
              },
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
                  provisionAfterExtensions: {
                    type: "array",
                    items: {
                      type: "string",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/${input.event.inputConfig.vmScaleSetName}/extensions/${input.event.inputConfig.vmssExtensionName}` +
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
              provisionAfterExtensions: {
                type: "array",
                items: {
                  type: "string",
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
            },
          },
          type: {
            type: "string",
          },
          name: {
            type: "string",
          },
        },
      },
    },
  },
};

export default VirtualMachineScaleSetExtensions_Update;
