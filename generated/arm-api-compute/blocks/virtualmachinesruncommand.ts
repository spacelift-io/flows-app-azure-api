import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachines_RunCommand: AppBlock = {
  name: "Virtual Machines / Run Command",
  description: "Run command on the VM.",
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
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              commandId: {
                type: "string",
              },
              script: {
                type: "array",
                items: {
                  type: "string",
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
            },
            required: ["commandId"],
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${input.event.inputConfig.vmName}/runCommand` +
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
          value: {
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
  },
};

export default VirtualMachines_RunCommand;
