import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Snapshots_GrantAccess: AppBlock = {
  name: "Snapshots / Grant Access",
  description: "Grants access to a snapshot.",
  category: "Snapshots",
  inputs: {
    default: {
      config: {
        snapshotName: {
          name: "Snapshot Name",
          description: "Name of the snapshot",
          type: "string",
          required: true,
        },
        grantAccessData: {
          name: "Grant Access Data",
          description:
            "Access data object supplied in the body of the get snapshot access operation.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/snapshots/${input.event.inputConfig.snapshotName}/beginGetAccess` +
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

export default Snapshots_GrantAccess;
