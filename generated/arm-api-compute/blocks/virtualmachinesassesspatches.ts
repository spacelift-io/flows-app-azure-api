import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachines_AssessPatches: AppBlock = {
  name: "Virtual Machines / Assess Patches",
  description: "Assess patches on the VM.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${input.event.inputConfig.vmName}/assessPatches` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          startDateTime: {
            type: "string",
          },
          availablePatches: {
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
                rebootBehavior: {
                  type: "string",
                },
                activityId: {
                  type: "string",
                },
                publishedDate: {
                  type: "string",
                },
                lastModifiedDateTime: {
                  type: "string",
                },
                assessmentState: {
                  type: "string",
                },
              },
            },
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

export default VirtualMachines_AssessPatches;
