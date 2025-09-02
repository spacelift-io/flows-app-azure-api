import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ScopeConnections_CreateOrUpdate: AppBlock = {
  name: "Scope Connections / Create Or Update",
  description: "Creates or updates scope connection from Network Manager",
  category: "Scope Connections",
  inputs: {
    default: {
      config: {
        networkManagerName: {
          name: "Network Manager Name",
          description: "Name of the network manager",
          type: "string",
          required: true,
        },
        scopeConnectionName: {
          name: "Scope Connection Name",
          description: "Name of the scope connection",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Scope connection to be created/updated.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  tenantId: {
                    type: "string",
                  },
                  resourceId: {
                    type: "string",
                  },
                  connectionState: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                },
              },
              etag: {
                type: "string",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkManagers/${input.event.inputConfig.networkManagerName}/scopeConnections/${input.event.inputConfig.scopeConnectionName}` +
          "?api-version=2024-10-01";

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
              tenantId: {
                type: "string",
              },
              resourceId: {
                type: "string",
              },
              connectionState: {
                type: "string",
              },
              description: {
                type: "string",
              },
            },
          },
          etag: {
            type: "string",
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

export default ScopeConnections_CreateOrUpdate;
