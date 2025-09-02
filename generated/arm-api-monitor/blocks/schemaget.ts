import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Schema_Get: AppBlock = {
  name: "Schema / Get",
  description: "Gets the schema for a given workspace.",
  category: "Schema",
  inputs: {
    default: {
      config: {
        workspaceName: {
          name: "Workspace Name",
          description: "Name of the workspace",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourcegroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/${input.event.inputConfig.workspaceName}/schema` +
          "?api-version=2025-02-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          metadata: {
            type: "object",
            properties: {
              requestId: {
                type: "string",
              },
              resultType: {
                type: "string",
              },
              total: {
                type: "integer",
              },
              top: {
                type: "integer",
              },
              id: {
                type: "string",
              },
              coreSummaries: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                    },
                    numberOfDocuments: {
                      type: "integer",
                    },
                  },
                  required: ["numberOfDocuments"],
                },
              },
              status: {
                type: "string",
              },
              startTime: {
                type: "string",
              },
              lastUpdated: {
                type: "string",
              },
              eTag: {
                type: "string",
              },
              sort: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                    },
                    order: {
                      type: "string",
                    },
                  },
                },
              },
              requestTime: {
                type: "integer",
              },
              aggregatedValueField: {
                type: "string",
              },
              aggregatedGroupingFields: {
                type: "string",
              },
              sum: {
                type: "integer",
              },
              max: {
                type: "integer",
              },
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                  },
                  version: {
                    type: "integer",
                  },
                },
              },
            },
          },
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                displayName: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                indexed: {
                  type: "boolean",
                },
                stored: {
                  type: "boolean",
                },
                facet: {
                  type: "boolean",
                },
                ownerType: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
              required: ["facet", "stored", "indexed"],
            },
          },
        },
      },
    },
  },
};

export default Schema_Get;
