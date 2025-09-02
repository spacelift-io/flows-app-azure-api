import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachineScaleSets_ForceRecoveryServiceFabricPlatformUpdateDomainWalk: AppBlock =
  {
    name: "Virtual Machine Scale Sets / Force Recovery Service Fabric Platform Update Domain Walk",
    description:
      "Manual platform update domain walk to update virtual machines in a service fabric virtual machine scale set.",
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
          platformUpdateDomain: {
            name: "Platform Update Domain",
            description:
              "The platform update domain for which a manual recovery walk is requested",
            type: "number",
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
          zone: {
            name: "Zone",
            description:
              "The zone in which the manual recovery walk is requested for cross zone virtual machine scale set",
            type: "string",
            required: false,
          },
          placementGroupId: {
            name: "Placement Group ID",
            description:
              "The placement group id for which the manual recovery walk is requested.",
            type: "string",
            required: false,
          },
        },
        onEvent: async (input) => {
          const url =
            `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/${input.event.inputConfig.vmScaleSetName}/forceRecoveryServiceFabricPlatformUpdateDomainWalk` +
            "?api-version=2024-11-01" +
            (input.event.inputConfig.platformUpdateDomain
              ? `&platformUpdateDomain=${input.event.inputConfig.platformUpdateDomain}`
              : "") +
            (input.event.inputConfig.zone
              ? `&zone=${input.event.inputConfig.zone}`
              : "") +
            (input.event.inputConfig.placementGroupId
              ? `&placementGroupId=${input.event.inputConfig.placementGroupId}`
              : "");

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
            walkPerformed: {
              type: "boolean",
            },
            nextPlatformUpdateDomain: {
              type: "integer",
            },
          },
        },
      },
    },
  };

export default VirtualMachineScaleSets_ForceRecoveryServiceFabricPlatformUpdateDomainWalk;
