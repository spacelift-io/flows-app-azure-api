import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachines_Capture: AppBlock = {
  name: "Virtual Machines / Capture",
  description:
    "Captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to create similar VMs.",
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
              vhdPrefix: {
                type: "string",
              },
              destinationContainerName: {
                type: "string",
              },
              overwriteVhds: {
                type: "boolean",
              },
            },
            required: [
              "vhdPrefix",
              "destinationContainerName",
              "overwriteVhds",
            ],
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${input.event.inputConfig.vmName}/capture` +
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
          $schema: {
            type: "string",
          },
          contentVersion: {
            type: "string",
          },
          parameters: {
            type: "object",
          },
          resources: {
            type: "array",
            items: {
              type: "object",
            },
          },
        },
      },
    },
  },
};

export default VirtualMachines_Capture;
