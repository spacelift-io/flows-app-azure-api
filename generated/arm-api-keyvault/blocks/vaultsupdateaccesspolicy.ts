import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Vaults_UpdateAccessPolicy: AppBlock = {
  name: "Vaults / Update Access Policy",
  description:
    "Update access policies in a key vault in the specified subscription.",
  category: "Vaults",
  inputs: {
    default: {
      config: {
        vaultName: {
          name: "Vault Name",
          description: "Name of the vault",
          type: "string",
          required: true,
        },
        operationKind: {
          name: "Operation Kind",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Access policy to merge into the vault",
          type: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              name: {
                type: "string",
              },
              type: {
                type: "string",
              },
              location: {
                type: "string",
              },
              properties: {
                type: "object",
                properties: {
                  accessPolicies: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        tenantId: {
                          type: "string",
                        },
                        objectId: {
                          type: "string",
                        },
                        applicationId: {
                          type: "string",
                        },
                        permissions: {
                          type: "object",
                          properties: {
                            keys: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            secrets: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            certificates: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                            storage: {
                              type: "array",
                              items: {
                                type: "string",
                              },
                            },
                          },
                        },
                      },
                      required: ["tenantId", "objectId", "permissions"],
                    },
                  },
                },
                required: ["accessPolicies"],
              },
            },
            required: ["properties"],
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
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.KeyVault/vaults/${input.event.inputConfig.vaultName}/accessPolicies/${input.event.inputConfig.operationKind}` +
          "?api-version=2023-07-01";

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
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          type: {
            type: "string",
          },
          location: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              accessPolicies: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    tenantId: {
                      type: "string",
                    },
                    objectId: {
                      type: "string",
                    },
                    applicationId: {
                      type: "string",
                    },
                    permissions: {
                      type: "object",
                      properties: {
                        keys: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        secrets: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        certificates: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                        storage: {
                          type: "array",
                          items: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                  required: ["tenantId", "objectId", "permissions"],
                },
              },
            },
            required: ["accessPolicies"],
          },
        },
        required: ["properties"],
      },
    },
  },
};

export default Vaults_UpdateAccessPolicy;
