import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_RestoreSnapshotSlot: AppBlock = {
  name: "Web Apps / Restore Snapshot Slot",
  description: "Description for Restores a web app from a snapshot.",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        slot: {
          name: "Slot",
          type: "string",
          required: true,
        },
        restoreRequest: {
          name: "Restore Request",
          description:
            "Snapshot restore settings. Snapshot information can be obtained by calling GetDeletedSites or GetSiteSnapshots API.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  snapshotTime: {
                    type: "string",
                  },
                  recoverySource: {
                    type: "object",
                    properties: {
                      location: {
                        type: "string",
                      },
                      id: {
                        type: "string",
                      },
                    },
                  },
                  overwrite: {
                    type: "boolean",
                  },
                  recoverConfiguration: {
                    type: "boolean",
                  },
                  ignoreConflictingHostNames: {
                    type: "boolean",
                  },
                  useDRSecondary: {
                    type: "boolean",
                  },
                },
                required: ["overwrite"],
              },
            },
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
        const requestBody = input.event.inputConfig.restoreRequest;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/restoreSnapshot` +
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

export default WebApps_RestoreSnapshotSlot;
