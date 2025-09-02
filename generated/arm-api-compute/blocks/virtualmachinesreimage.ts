import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachines_Reimage: AppBlock = {
  name: "Virtual Machines / Reimage",
  description:
    "Reimages (upgrade the operating system) a virtual machine which don't have a ephemeral OS disk, for virtual machines who have a ephemeral OS disk the virtual machine is reset to initial state. NOTE: The retaining of old OS disk depends on the value of deleteOption of OS disk. If deleteOption is detach, the old OS disk will be preserved after reimage. If deleteOption is delete, the old OS disk will be deleted after reimage. The deleteOption of the OS disk should be updated accordingly before performing the reimage.",
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
              tempDisk: {
                type: "boolean",
              },
              exactVersion: {
                type: "string",
              },
              osProfile: {
                type: "object",
                properties: {
                  adminPassword: {
                    type: "string",
                  },
                  customData: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${input.event.inputConfig.vmName}/reimage` +
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

export default VirtualMachines_Reimage;
