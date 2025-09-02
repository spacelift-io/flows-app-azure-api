import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachines_InstallPatches: AppBlock = {
  name: "Virtual Machines / Install Patches",
  description: "Installs patches on the VM.",
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
        installPatchesInput: {
          name: "Install Patches Input",
          description:
            "Input for InstallPatches as directly received by the API",
          type: {
            type: "object",
            properties: {
              maximumDuration: {
                type: "string",
              },
              rebootSetting: {
                type: "string",
              },
              windowsParameters: {
                type: "object",
                properties: {
                  classificationsToInclude: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  kbNumbersToInclude: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  kbNumbersToExclude: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  excludeKbsRequiringReboot: {
                    type: "boolean",
                  },
                  maxPatchPublishDate: {
                    type: "string",
                  },
                },
              },
              linuxParameters: {
                type: "object",
                properties: {
                  classificationsToInclude: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  packageNameMasksToInclude: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  packageNameMasksToExclude: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  maintenanceRunId: {
                    type: "string",
                  },
                },
              },
            },
            required: ["rebootSetting"],
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
        const requestBody = input.event.inputConfig.installPatchesInput;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${input.event.inputConfig.vmName}/installPatches` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          status: {
            type: "string",
          },
          installationActivityId: {
            type: "string",
          },
          rebootStatus: {
            type: "string",
          },
          maintenanceWindowExceeded: {
            type: "boolean",
          },
          excludedPatchCount: {
            type: "integer",
          },
          notSelectedPatchCount: {
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
          patches: {
            type: "array",
            items: {
              type: "object",
              properties: {
                patchId: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                version: {
                  type: "string",
                },
                kbId: {
                  type: "string",
                },
                classifications: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                installationState: {
                  type: "string",
                },
              },
            },
          },
          startDateTime: {
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
    },
  },
};

export default VirtualMachines_InstallPatches;
