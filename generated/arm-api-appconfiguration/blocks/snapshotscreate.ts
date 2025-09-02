import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Snapshots_Create: AppBlock = {
  name: "Snapshots / Create",
  description:
    "Creates a snapshot. NOTE: This operation is intended for use in Azure Resource Manager (ARM) Template deployments. For all other scenarios involving App Configuration snapshots the data plane API should be used instead.",
  category: "Snapshots",
  inputs: {
    default: {
      config: {
        configStoreName: {
          name: "Config Store Name",
          description: "Name of the config store",
          type: "string",
          required: true,
        },
        snapshotName: {
          name: "Snapshot Name",
          description: "Name of the snapshot",
          type: "string",
          required: true,
        },
        body: {
          name: "Body",
          description: "Body (base64-encoded)",
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
              properties: {
                type: "object",
                properties: {
                  provisioningState: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  filters: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        key: {
                          type: "string",
                        },
                        label: {
                          type: "string",
                        },
                      },
                      required: ["key"],
                    },
                  },
                  compositionType: {
                    type: "string",
                  },
                  created: {
                    type: "string",
                  },
                  expires: {
                    type: "string",
                  },
                  retentionPeriod: {
                    type: "number",
                  },
                  size: {
                    type: "number",
                  },
                  itemsCount: {
                    type: "number",
                  },
                  tags: {
                    type: "object",
                    additionalProperties: true,
                  },
                  etag: {
                    type: "string",
                  },
                },
                required: ["filters"],
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
        const requestBody = input.event.inputConfig.body;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.AppConfiguration/configurationStores/${input.event.inputConfig.configStoreName}/snapshots/${input.event.inputConfig.snapshotName}` +
          "?api-version=2024-06-01";

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
          properties: {
            type: "object",
            properties: {
              provisioningState: {
                type: "string",
              },
              status: {
                type: "string",
              },
              filters: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    key: {
                      type: "string",
                    },
                    label: {
                      type: "string",
                    },
                  },
                  required: ["key"],
                },
              },
              compositionType: {
                type: "string",
              },
              created: {
                type: "string",
              },
              expires: {
                type: "string",
              },
              retentionPeriod: {
                type: "integer",
              },
              size: {
                type: "integer",
              },
              itemsCount: {
                type: "integer",
              },
              tags: {
                type: "object",
                additionalProperties: true,
              },
              etag: {
                type: "string",
              },
            },
            required: ["filters"],
          },
        },
      },
    },
  },
};

export default Snapshots_Create;
