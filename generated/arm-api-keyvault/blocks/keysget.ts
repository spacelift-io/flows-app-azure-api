import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Keys_Get: AppBlock = {
  name: "Keys / Get",
  description:
    "Gets the current version of the specified key from the specified key vault.",
  category: "Keys",
  inputs: {
    default: {
      config: {
        vaultName: {
          name: "Vault Name",
          description: "Name of the vault",
          type: "string",
          required: true,
        },
        keyName: {
          name: "Key Name",
          description: "Name of the key",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.KeyVault/vaults/${input.event.inputConfig.vaultName}/keys/${input.event.inputConfig.keyName}` +
          "?api-version=2023-07-01";

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
              attributes: {
                type: "object",
                properties: {
                  enabled: {
                    type: "boolean",
                  },
                  nbf: {
                    type: "integer",
                  },
                  exp: {
                    type: "integer",
                  },
                  created: {
                    type: "integer",
                  },
                  updated: {
                    type: "integer",
                  },
                  recoveryLevel: {
                    type: "string",
                  },
                  exportable: {
                    type: "boolean",
                  },
                },
              },
              kty: {
                type: "string",
              },
              keyOps: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              keySize: {
                type: "integer",
              },
              curveName: {
                type: "string",
              },
              keyUri: {
                type: "string",
              },
              keyUriWithVersion: {
                type: "string",
              },
              rotationPolicy: {
                type: "object",
                properties: {
                  attributes: {
                    type: "object",
                    properties: {
                      created: {
                        type: "integer",
                      },
                      updated: {
                        type: "integer",
                      },
                      expiryTime: {
                        type: "string",
                      },
                    },
                  },
                  lifetimeActions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        trigger: {
                          type: "object",
                          properties: {
                            timeAfterCreate: {
                              type: "string",
                            },
                            timeBeforeExpiry: {
                              type: "string",
                            },
                          },
                        },
                        action: {
                          type: "object",
                          properties: {
                            type: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              release_policy: {
                type: "object",
                properties: {
                  contentType: {
                    type: "string",
                  },
                  data: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        required: ["properties"],
      },
    },
  },
};

export default Keys_Get;
