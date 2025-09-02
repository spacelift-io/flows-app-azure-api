import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FileServices_GetServiceUsage: AppBlock = {
  name: "File Services / Get Service Usage",
  description:
    "Gets the usage of file service in storage account including account limits, file share limits and constants used in recommendations and bursting formula.",
  category: "File Services",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        FileServicesName: {
          name: "File Services Name",
          description: "Name of the file services",
          type: "string",
          required: true,
        },
        fileServiceUsagesName: {
          name: "File Service Usages Name",
          description: "Name of the file service usages",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/fileServices/${input.event.inputConfig.FileServicesName}/usages/${input.event.inputConfig.fileServiceUsagesName}` +
          "?api-version=2025-01-01";

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
          properties: {
            type: "object",
            properties: {
              storageAccountLimits: {
                type: "object",
                properties: {
                  maxFileShares: {
                    type: "integer",
                  },
                  maxProvisionedStorageGiB: {
                    type: "integer",
                  },
                  maxProvisionedIOPS: {
                    type: "integer",
                  },
                  maxProvisionedBandwidthMiBPerSec: {
                    type: "integer",
                  },
                },
              },
              fileShareLimits: {
                type: "object",
                properties: {
                  minProvisionedStorageGiB: {
                    type: "integer",
                  },
                  maxProvisionedStorageGiB: {
                    type: "integer",
                  },
                  minProvisionedIOPS: {
                    type: "integer",
                  },
                  maxProvisionedIOPS: {
                    type: "integer",
                  },
                  minProvisionedBandwidthMiBPerSec: {
                    type: "integer",
                  },
                  maxProvisionedBandwidthMiBPerSec: {
                    type: "integer",
                  },
                },
              },
              fileShareRecommendations: {
                type: "object",
                properties: {
                  baseIOPS: {
                    type: "integer",
                  },
                  ioScalar: {
                    type: "number",
                  },
                  baseBandwidthMiBPerSec: {
                    type: "integer",
                  },
                  bandwidthScalar: {
                    type: "number",
                  },
                },
              },
              burstingConstants: {
                type: "object",
                properties: {
                  burstFloorIOPS: {
                    type: "integer",
                  },
                  burstIOScalar: {
                    type: "number",
                  },
                  burstTimeframeSeconds: {
                    type: "integer",
                  },
                },
              },
              storageAccountUsage: {
                type: "object",
                properties: {
                  liveShares: {
                    type: "object",
                    properties: {
                      fileShareCount: {
                        type: "integer",
                      },
                      provisionedStorageGiB: {
                        type: "integer",
                      },
                      provisionedIOPS: {
                        type: "integer",
                      },
                      provisionedBandwidthMiBPerSec: {
                        type: "integer",
                      },
                    },
                  },
                  softDeletedShares: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default FileServices_GetServiceUsage;
