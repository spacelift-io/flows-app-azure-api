import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DiskEncryptionSets_ListAssociatedResources: AppBlock = {
  name: "Disk Encryption Sets / List Associated Resources",
  description:
    "Lists all resources that are encrypted with this disk encryption set.",
  category: "Disk Encryption Sets",
  inputs: {
    default: {
      config: {
        diskEncryptionSetName: {
          name: "Disk Encryption Set Name",
          description: "Name of the disk encryption set",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/${input.event.inputConfig.diskEncryptionSetName}/associatedResources` +
          "?api-version=2025-01-02";

        const result = await makeAzureRequest(
          input,
          url,
          "GET",
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
          value: {
            type: "array",
            items: {
              type: "string",
            },
          },
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default DiskEncryptionSets_ListAssociatedResources;
