import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DiskRestorePoint_RevokeAccess: AppBlock = {
  name: "Disk Restore Point / Revoke Access",
  description: "Revokes access to a diskRestorePoint.",
  category: "Disk Restore Point",
  inputs: {
    default: {
      config: {
        restorePointCollectionName: {
          name: "Restore Point Collection Name",
          description: "Name of the restore point collection",
          type: "string",
          required: true,
        },
        vmRestorePointName: {
          name: "VM Restore Point Name",
          description: "Name of the vm restore point",
          type: "string",
          required: true,
        },
        diskRestorePointName: {
          name: "Disk Restore Point Name",
          description: "Name of the disk restore point",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/${input.event.inputConfig.restorePointCollectionName}/restorePoints/${input.event.inputConfig.vmRestorePointName}/diskRestorePoints/${input.event.inputConfig.diskRestorePointName}/endGetAccess` +
          "?api-version=2025-01-02";

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
        additionalProperties: true,
      },
    },
  },
};

export default DiskRestorePoint_RevokeAccess;
