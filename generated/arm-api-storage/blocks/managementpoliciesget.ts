import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagementPolicies_Get: AppBlock = {
  name: "Management Policies / Get",
  description:
    "Gets the managementpolicy associated with the specified storage account.",
  category: "Management Policies",
  inputs: {
    default: {
      config: {
        accountName: {
          name: "Account Name",
          description: "Name of the account",
          type: "string",
          required: true,
        },
        managementPolicyName: {
          name: "Management Policy Name",
          description: "Name of the management policy",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/managementPolicies/${input.event.inputConfig.managementPolicyName}` +
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
              lastModifiedTime: {
                type: "string",
              },
              policy: {
                type: "object",
                properties: {
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
                        type: {
                          type: "string",
                        },
                        definition: {
                          type: "object",
                          properties: {
                            actions: {
                              type: "object",
                              properties: {
                                baseBlob: {
                                  type: "object",
                                  properties: {
                                    tierToCool: {
                                      type: "object",
                                      properties: {
                                        daysAfterModificationGreaterThan: {
                                          type: "number",
                                        },
                                        daysAfterLastAccessTimeGreaterThan: {
                                          type: "number",
                                        },
                                        daysAfterLastTierChangeGreaterThan: {
                                          type: "number",
                                        },
                                        daysAfterCreationGreaterThan: {
                                          type: "number",
                                        },
                                      },
                                    },
                                    tierToArchive: {
                                      type: "object",
                                      properties: {
                                        daysAfterModificationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastAccessTimeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastTierChangeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterCreationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                    },
                                    tierToCold: {
                                      type: "object",
                                      properties: {
                                        daysAfterModificationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastAccessTimeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastTierChangeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterCreationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                    },
                                    tierToHot: {
                                      type: "object",
                                      properties: {
                                        daysAfterModificationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastAccessTimeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastTierChangeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterCreationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                    },
                                    delete: {
                                      type: "object",
                                      properties: {
                                        daysAfterModificationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastAccessTimeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastTierChangeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterCreationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                    },
                                    enableAutoTierToHotFromCool: {
                                      type: "boolean",
                                    },
                                  },
                                },
                                snapshot: {
                                  type: "object",
                                  properties: {
                                    tierToCool: {
                                      type: "object",
                                      properties: {
                                        daysAfterCreationGreaterThan: {
                                          type: "number",
                                        },
                                        daysAfterLastTierChangeGreaterThan: {
                                          type: "number",
                                        },
                                      },
                                      required: [
                                        "daysAfterCreationGreaterThan",
                                      ],
                                    },
                                    tierToArchive: {
                                      type: "object",
                                      properties: {
                                        daysAfterCreationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastTierChangeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                      required: [
                                        "daysAfterCreationGreaterThan",
                                      ],
                                    },
                                    tierToCold: {
                                      type: "object",
                                      properties: {
                                        daysAfterCreationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastTierChangeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                      required: [
                                        "daysAfterCreationGreaterThan",
                                      ],
                                    },
                                    tierToHot: {
                                      type: "object",
                                      properties: {
                                        daysAfterCreationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastTierChangeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                      required: [
                                        "daysAfterCreationGreaterThan",
                                      ],
                                    },
                                    delete: {
                                      type: "object",
                                      properties: {
                                        daysAfterCreationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastTierChangeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                      required: [
                                        "daysAfterCreationGreaterThan",
                                      ],
                                    },
                                  },
                                },
                                version: {
                                  type: "object",
                                  properties: {
                                    tierToCool: {
                                      type: "object",
                                      properties: {
                                        daysAfterCreationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastTierChangeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                      required: [
                                        "daysAfterCreationGreaterThan",
                                      ],
                                    },
                                    tierToArchive: {
                                      type: "object",
                                      properties: {
                                        daysAfterCreationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastTierChangeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                      required: [
                                        "daysAfterCreationGreaterThan",
                                      ],
                                    },
                                    tierToCold: {
                                      type: "object",
                                      properties: {
                                        daysAfterCreationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastTierChangeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                      required: [
                                        "daysAfterCreationGreaterThan",
                                      ],
                                    },
                                    tierToHot: {
                                      type: "object",
                                      properties: {
                                        daysAfterCreationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastTierChangeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                      required: [
                                        "daysAfterCreationGreaterThan",
                                      ],
                                    },
                                    delete: {
                                      type: "object",
                                      properties: {
                                        daysAfterCreationGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                        daysAfterLastTierChangeGreaterThan: {
                                          type: "object",
                                          additionalProperties: true,
                                        },
                                      },
                                      required: [
                                        "daysAfterCreationGreaterThan",
                                      ],
                                    },
                                  },
                                },
                              },
                            },
                            filters: {
                              type: "object",
                              properties: {
                                prefixMatch: {
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
                                blobIndexMatch: {
                                  type: "array",
                                  items: {
                                    type: "object",
                                    properties: {
                                      name: {
                                        type: "string",
                                      },
                                      op: {
                                        type: "string",
                                      },
                                      value: {
                                        type: "string",
                                      },
                                    },
                                    required: ["name", "op", "value"],
                                  },
                                },
                              },
                              required: ["blobTypes"],
                            },
                          },
                          required: ["actions"],
                        },
                      },
                      required: ["name", "type", "definition"],
                    },
                  },
                },
                required: ["rules"],
              },
            },
            required: ["policy"],
          },
        },
      },
    },
  },
};

export default ManagementPolicies_Get;
