import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DiskRestorePoint_ListByRestorePoint: AppBlock = {
  name: "Disk Restore Point / List By Restore Point",
  description: "Lists diskRestorePoints under a vmRestorePoint.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/restorePointCollections/${input.event.inputConfig.restorePointCollectionName}/restorePoints/${input.event.inputConfig.vmRestorePointName}/diskRestorePoints` +
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
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    timeCreated: {
                      type: "string",
                    },
                    sourceResourceId: {
                      type: "string",
                    },
                    osType: {
                      type: "string",
                    },
                    hyperVGeneration: {
                      type: "string",
                    },
                    purchasePlan: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        publisher: {
                          type: "string",
                        },
                        product: {
                          type: "string",
                        },
                        promotionCode: {
                          type: "string",
                        },
                      },
                      required: ["name", "publisher", "product"],
                    },
                    supportedCapabilities: {
                      type: "object",
                      properties: {
                        diskControllerTypes: {
                          type: "string",
                        },
                        acceleratedNetwork: {
                          type: "boolean",
                        },
                        architecture: {
                          type: "string",
                        },
                        supportedSecurityOption: {
                          type: "string",
                        },
                      },
                    },
                    familyId: {
                      type: "string",
                    },
                    sourceUniqueId: {
                      type: "string",
                    },
                    encryption: {
                      type: "object",
                      properties: {
                        diskEncryptionSetId: {
                          type: "string",
                        },
                        type: {
                          type: "string",
                        },
                      },
                    },
                    supportsHibernation: {
                      type: "boolean",
                    },
                    networkAccessPolicy: {
                      type: "string",
                    },
                    publicNetworkAccess: {
                      type: "string",
                    },
                    diskAccessId: {
                      type: "string",
                    },
                    completionPercent: {
                      type: "number",
                    },
                    replicationState: {
                      type: "string",
                    },
                    sourceResourceLocation: {
                      type: "string",
                    },
                    securityProfile: {
                      type: "object",
                      properties: {
                        securityType: {
                          type: "string",
                        },
                        secureVMDiskEncryptionSetId: {
                          type: "string",
                        },
                      },
                    },
                    logicalSectorSize: {
                      type: "integer",
                    },
                  },
                },
              },
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

export default DiskRestorePoint_ListByRestorePoint;
