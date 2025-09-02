import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Tokens_Create: AppBlock = {
  name: "Tokens / Create",
  description:
    "Creates a token for a container registry with the specified parameters.",
  category: "Tokens",
  inputs: {
    default: {
      config: {
        registryName: {
          name: "Registry Name",
          description: "Name of the registry",
          type: "string",
          required: true,
        },
        tokenName: {
          name: "Token Name",
          description: "Name of the token",
          type: "string",
          required: true,
        },
        tokenCreateParameters: {
          name: "Token Create Parameters",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  creationDate: {
                    type: "string",
                  },
                  provisioningState: {
                    type: "string",
                  },
                  scopeMapId: {
                    type: "string",
                  },
                  credentials: {
                    type: "object",
                    properties: {
                      certificates: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            name: {
                              type: "string",
                            },
                            expiry: {
                              type: "string",
                            },
                            thumbprint: {
                              type: "string",
                            },
                            encodedPemCertificate: {
                              type: "string",
                            },
                          },
                        },
                      },
                      passwords: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            creationTime: {
                              type: "string",
                            },
                            expiry: {
                              type: "string",
                            },
                            name: {
                              type: "string",
                            },
                            value: {
                              type: "string",
                            },
                          },
                        },
                      },
                    },
                  },
                  status: {
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
        const requestBody = input.event.inputConfig.tokenCreateParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/${input.event.inputConfig.registryName}/tokens/${input.event.inputConfig.tokenName}` +
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
          properties: {
            type: "object",
            properties: {
              creationDate: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
              scopeMapId: {
                type: "string",
              },
              credentials: {
                type: "object",
                properties: {
                  certificates: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                        },
                        expiry: {
                          type: "string",
                        },
                        thumbprint: {
                          type: "string",
                        },
                        encodedPemCertificate: {
                          type: "string",
                        },
                      },
                    },
                  },
                  passwords: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        creationTime: {
                          type: "string",
                        },
                        expiry: {
                          type: "string",
                        },
                        name: {
                          type: "string",
                        },
                        value: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              status: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default Tokens_Create;
