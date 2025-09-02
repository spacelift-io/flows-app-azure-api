import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FileServices_List: AppBlock = {
  name: "File Services / List",
  description: "List all file services in storage accounts",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/fileServices` +
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    cors: {
                      type: "object",
                      properties: {
                        corsRules: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              allowedOrigins: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              allowedMethods: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              maxAgeInSeconds: {
                                type: "integer",
                              },
                              exposedHeaders: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                              allowedHeaders: {
                                type: "array",
                                items: {
                                  type: "string",
                                },
                              },
                            },
                            required: [
                              "allowedOrigins",
                              "allowedMethods",
                              "maxAgeInSeconds",
                              "exposedHeaders",
                              "allowedHeaders",
                            ],
                          },
                        },
                      },
                    },
                    shareDeleteRetentionPolicy: {
                      type: "object",
                      properties: {
                        enabled: {
                          type: "boolean",
                        },
                        days: {
                          type: "integer",
                        },
                        allowPermanentDelete: {
                          type: "boolean",
                        },
                      },
                    },
                    protocolSettings: {
                      type: "object",
                      properties: {
                        smb: {
                          type: "object",
                          properties: {
                            multichannel: {
                              type: "object",
                              properties: {
                                enabled: {
                                  type: "boolean",
                                },
                              },
                            },
                            versions: {
                              type: "string",
                            },
                            authenticationMethods: {
                              type: "string",
                            },
                            kerberosTicketEncryption: {
                              type: "string",
                            },
                            channelEncryption: {
                              type: "string",
                            },
                            encryptionInTransit: {
                              type: "object",
                              properties: {
                                required: {
                                  type: "boolean",
                                },
                              },
                            },
                          },
                        },
                        nfs: {
                          type: "object",
                          properties: {
                            encryptionInTransit: {
                              type: "object",
                              properties: {
                                required: {
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
                sku: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    tier: {
                      type: "string",
                    },
                  },
                  required: ["name"],
                },
              },
            },
          },
        },
      },
    },
  },
};

export default FileServices_List;
