import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachines_migrateToVMScaleSet: AppBlock = {
  name: "Virtual Machines / migrate To VM Scale Set",
  description:
    "Migrate a virtual machine from availability set to Flexible Virtual Machine Scale Set.",
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
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              targetZone: {
                type: "string",
              },
              targetFaultDomain: {
                type: "number",
              },
              targetVMSize: {
                type: "string",
              },
            },
          },
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${input.event.inputConfig.vmName}/migrateToVirtualMachineScaleSet` +
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
        additionalProperties: true,
      },
    },
  },
};

export default VirtualMachines_migrateToVMScaleSet;
