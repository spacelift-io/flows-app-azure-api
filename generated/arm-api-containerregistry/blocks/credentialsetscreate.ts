import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CredentialSets_Create: AppBlock = {
  name: "Credential Sets / Create",
  description:
    "Creates a credential set for a container registry with the specified parameters.",
  category: "Credential Sets",
  inputs: {
    default: {
      config: {
        registryName: {
          name: "Registry Name",
          description: "Name of the registry",
          type: "string",
          required: true,
        },
        credentialSetName: {
          name: "Credential Set Name",
          description: "Name of the credential set",
          type: "string",
          required: true,
        },
        credentialSetCreateParameters: {
          name: "Credential Set Create Parameters",
          type: {
            type: "object",
            properties: {
              identity: {
                type: "object",
                properties: {
                  principalId: {
                    type: "string",
                  },
                  tenantId: {
                    type: "string",
                  },
                  type: {
                    type: "string",
                  },
                  userAssignedIdentities: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              properties: {
                type: "object",
                properties: {
                  loginServer: {
                    type: "string",
                  },
                  authCredentials: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        usernameSecretIdentifier: {
                          type: "string",
                        },
                        passwordSecretIdentifier: {
                          type: "string",
                        },
                        credentialHealth: {
                          type: "object",
                          properties: {
                            status: {
                              type: "string",
                            },
                            errorCode: {
                              type: "string",
                            },
                            errorMessage: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                  creationDate: {
                    type: "string",
                  },
                  provisioningState: {
                    type: "string",
                  },
                },
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
        const requestBody =
          input.event.inputConfig.credentialSetCreateParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/${input.event.inputConfig.registryName}/credentialSets/${input.event.inputConfig.credentialSetName}` +
          "?api-version=2025-04-01";

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
          identity: {
            type: "object",
            properties: {
              principalId: {
                type: "string",
              },
              tenantId: {
                type: "string",
              },
              type: {
                type: "string",
              },
              userAssignedIdentities: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
          properties: {
            type: "object",
            properties: {
              loginServer: {
                type: "string",
              },
              authCredentials: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    usernameSecretIdentifier: {
                      type: "string",
                    },
                    passwordSecretIdentifier: {
                      type: "string",
                    },
                    credentialHealth: {
                      type: "object",
                      properties: {
                        status: {
                          type: "string",
                        },
                        errorCode: {
                          type: "string",
                        },
                        errorMessage: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              creationDate: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default CredentialSets_Create;
