import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const BlobInventoryPolicies_CreateOrUpdate: AppBlock = {
  name: "Blob Inventory Policies / Create Or Update",
  description:
    "Sets the blob inventory policy to the specified storage account.",
  category: "Blob Inventory Policies",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        blobInventoryPolicyName: {
          name: "Blob Inventory Policy Name",
          description: "Name of the blob inventory policy",
          type: "string",
          required: true,
        },
        properties: {
          name: "Properties",
          description: "The blob inventory policy set to a storage account.",
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
        const requestBody = input.event.inputConfig.properties;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/inventoryPolicies/${input.event.inputConfig.blobInventoryPolicyName}` +
          "?api-version=2025-01-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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
          properties: {
            type: "object",
            properties: {
              lastModifiedTime: {
                type: "string",
              },
              policy: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  destination: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                  rules: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        enabled: {
                          type: "boolean",
                        },
                        name: {
                          type: "string",
                        },
                        destination: {
                          type: "string",
                        },
                        definition: {
                          type: "object",
                          properties: {
                            filters: {
                              type: "object",
                              properties: {
                                prefixMatch: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                                excludePrefix: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                                blobTypes: {
                                  type: "array",
                                  items: {
                                    type: "string",
                                  },
                                },
                                includeBlobVersions: {
                                  type: "boolean",
                                },
                                includeSnapshots: {
                                  type: "boolean",
                                },
                                includeDeleted: {
                                  type: "boolean",
                                },
                                creationTime: {
                                  type: "object",
                                  properties: {
                                    lastNDays: {
                                      type: "integer",
                                    },
                                  },
                                },
                              },
                            },
                            format: {
                              type: "string",
                            },
                            schedule: {
                              type: "string",
                            },
                            objectType: {
                              type: "string",
                            },
                            schemaFields: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                          },
                          required: [
                            "format",
                            "schedule",
                            "objectType",
                            "schemaFields",
                          ],
                        },
                      },
                      required: [
                        "name",
                        "enabled",
                        "destination",
                        "definition",
                      ],
                    },
                  },
                },
                required: ["enabled", "type", "rules"],
              },
            },
            required: ["policy"],
          },
          systemData: {
            type: "object",
            properties: {
              createdBy: {
                type: "string",
              },
              createdByType: {
                type: "string",
              },
              createdAt: {
                type: "string",
              },
              lastModifiedBy: {
                type: "string",
              },
              lastModifiedByType: {
                type: "string",
              },
              lastModifiedAt: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default BlobInventoryPolicies_CreateOrUpdate;
