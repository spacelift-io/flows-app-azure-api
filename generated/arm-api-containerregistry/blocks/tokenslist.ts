import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Tokens_List: AppBlock = {
  name: "Tokens / List",
  description: "Lists all the tokens for the specified container registry.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.ContainerRegistry/registries/${input.event.inputConfig.registryName}/tokens` +
          "?api-version=2025-04-01";

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
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Tokens_List;
