import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachineScaleSets_GetInstanceView: AppBlock = {
  name: "Virtual Machine Scale Sets / Get Instance View",
  description: "Gets the status of a VM scale set instance.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/${input.event.inputConfig.vmScaleSetName}/instanceView` +
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
          virtualMachine: {
            type: "object",
            properties: {
              statusesSummary: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: {
                      type: "string",
                    },
                    count: {
                      type: "integer",
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
                statusesSummary: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      code: {
                        type: "string",
                      },
                      count: {
                        type: "integer",
                      },
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
          orchestrationServices: {
            type: "array",
            items: {
              type: "object",
              properties: {
                serviceName: {
                  type: "string",
                },
                serviceState: {
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

export default VirtualMachineScaleSets_GetInstanceView;
