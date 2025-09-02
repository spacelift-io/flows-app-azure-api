import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FileShares_Lease: AppBlock = {
  name: "File Shares / Lease",
  description:
    "The Lease Share operation establishes and manages a lock on a share for delete operations. The lock duration can be 15 to 60 seconds, or can be infinite.",
  category: "File Shares",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        shareName: {
          name: "Share Name",
          description: "Name of the share",
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
          description: "Lease Share request body.",
          type: "string",
          required: false,
        },
        x_ms_snapshot: {
          name: "Snapshot",
          description:
            "Optional. Specify the snapshot time to lease a snapshot.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.x_ms_snapshot) {
          additionalHeaders["x-ms-snapshot"] = String(
            input.event.inputConfig.x_ms_snapshot,
          );
        }

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/fileServices/default/shares/${input.event.inputConfig.shareName}/lease` +
          "?api-version=2025-01-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
          requestBody,
          additionalHeaders,
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
          leaseId: {
            type: "string",
          },
          leaseTimeSeconds: {
            type: "string",
          },
        },
      },
    },
  },
};

export default FileShares_Lease;
