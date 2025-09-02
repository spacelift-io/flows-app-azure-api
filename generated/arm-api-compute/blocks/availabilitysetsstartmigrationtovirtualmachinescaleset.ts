import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AvailabilitySets_StartMigrationToVirtualMachineScaleSet: AppBlock = {
  name: "Availability Sets / Start Migration To Virtual Machine Scale Set",
  description:
    "Start migration operation on an Availability Set to move its Virtual Machines to a Virtual Machine Scale Set. This should be followed by a migrate operation on each Virtual Machine that triggers a downtime on the Virtual Machine.",
  category: "Availability Sets",
  inputs: {
    default: {
      config: {
        availabilitySetName: {
          name: "Availability Set Name",
          description: "Name of the availability set",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              virtualMachineScaleSetFlexible: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
            },
            required: ["virtualMachineScaleSetFlexible"],
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/availabilitySets/${input.event.inputConfig.availabilitySetName}/startMigrationToVirtualMachineScaleSet` +
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

export default AvailabilitySets_StartMigrationToVirtualMachineScaleSet;
