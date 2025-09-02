import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachineScaleSets_Reimage: AppBlock = {
  name: "Virtual Machine Scale Sets / Reimage",
  description:
    "Reimages (upgrade the operating system) one or more virtual machines in a VM scale set which don't have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is reset to initial state.",
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
        vmScaleSetReimageInput: {
          name: "VM Scale Set Reimage Input",
          type: {
            type: "object",
            properties: {
              instanceIds: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.vmScaleSetReimageInput;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/${input.event.inputConfig.vmScaleSetName}/reimage` +
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

export default VirtualMachineScaleSets_Reimage;
