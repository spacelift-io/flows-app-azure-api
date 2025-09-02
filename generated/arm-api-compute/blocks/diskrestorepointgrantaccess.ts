import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DiskRestorePoint_GrantAccess: AppBlock = {
  name: "Disk Restore Point / Grant Access",
  description: "Grants access to a diskRestorePoint.",
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
        grantAccessData: {
          name: "Grant Access Data",
          description:
            "Access data object supplied in the body of the get disk access operation.",
          type: {
            type: "object",
            properties: {
              access: {
                type: "string",
              },
              durationInSeconds: {
                type: "number",
              },
              getSecureVMGuestStateSAS: {
                type: "boolean",
              },
              fileFormat: {
                type: "string",
              },
            },
            required: ["access", "durationInSeconds"],
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
        const requestBody = input.event.inputConfig.grantAccessData;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/${input.event.inputConfig.restorePointCollectionName}/restorePoints/${input.event.inputConfig.vmRestorePointName}/diskRestorePoints/${input.event.inputConfig.diskRestorePointName}/beginGetAccess` +
          "?api-version=2025-01-02";

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
          accessSAS: {
            type: "string",
          },
          securityDataAccessSAS: {
            type: "string",
          },
          securityMetadataAccessSAS: {
            type: "string",
          },
        },
      },
    },
  },
};

export default DiskRestorePoint_GrantAccess;
