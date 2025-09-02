import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const FileServices_SetServiceProperties: AppBlock = {
  name: "File Services / Set Service Properties",
  description:
    "Sets the properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules.",
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
        parameters: {
          name: "Parameters",
          description:
            "The properties of file services in storage accounts, including CORS (Cross-Origin Resource Sharing) rules.",
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Storage/storageAccounts/${input.event.inputConfig.accountName}/fileServices/${input.event.inputConfig.FileServicesName}` +
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
};

export default FileServices_SetServiceProperties;
