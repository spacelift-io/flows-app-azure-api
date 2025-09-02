import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachineScaleSets_GetOSUpgradeHistory: AppBlock = {
  name: "Virtual Machine Scale Sets / Get OS Upgrade History",
  description: "Gets list of OS upgrades on a VM scale set instance.",
  category: "Virtual Machine Scale Sets",
  inputs: {
    default: {
      config: {
        vmScaleSetName: {
          name: "VM Scale Set Name",
          description: "Name of the vm scale set",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/${input.event.inputConfig.vmScaleSetName}/osUpgradeHistory` +
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    runningStatus: {
                      type: "object",
                      properties: {
                        code: {
                          type: "string",
                        },
                        startTime: {
                          type: "string",
                        },
                        endTime: {
                          type: "string",
                        },
                      },
                    },
                    progress: {
                      type: "object",
                      properties: {
                        successfulInstanceCount: {
                          type: "integer",
                        },
                        failedInstanceCount: {
                          type: "integer",
                        },
                        inProgressInstanceCount: {
                          type: "integer",
                        },
                        pendingInstanceCount: {
                          type: "integer",
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
                    startedBy: {
                      type: "string",
                    },
                    targetImageReference: {
                      type: "object",
                      properties: {
                        publisher: {
                          type: "string",
                        },
                        offer: {
                          type: "string",
                        },
                        sku: {
                          type: "string",
                        },
                        version: {
                          type: "string",
                        },
                        exactVersion: {
                          type: "string",
                        },
                        sharedGalleryImageId: {
                          type: "string",
                        },
                        communityGalleryImageId: {
                          type: "string",
                        },
                      },
                    },
                    rollbackInfo: {
                      type: "object",
                      properties: {
                        successfullyRolledbackInstanceCount: {
                          type: "integer",
                        },
                        failedRolledbackInstanceCount: {
                          type: "integer",
                        },
                        rollbackError: {
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
                  },
                },
                type: {
                  type: "string",
                },
                location: {
                  type: "string",
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default VirtualMachineScaleSets_GetOSUpgradeHistory;
