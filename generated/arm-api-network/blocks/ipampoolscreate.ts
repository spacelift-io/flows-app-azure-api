import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const IpamPools_Create: AppBlock = {
  name: "Ipam Pools / Create",
  description: "Creates/Updates the Pool resource.",
  category: "Ipam Pools",
  inputs: {
    default: {
      config: {
        networkManagerName: {
          name: "Network Manager Name",
          description: "Name of the network manager",
          type: "string",
          required: true,
        },
        poolName: {
          name: "Pool Name",
          description: "Name of the pool",
          type: "string",
          required: true,
        },
        body: {
          name: "Body",
          description: "Pool resource object to create/update.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  displayName: {
                    type: "string",
                  },
                  ipAddressType: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  parentPoolName: {
                    type: "string",
                  },
                  addressPrefixes: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  provisioningState: {
                    type: "string",
                  },
                },
                required: ["addressPrefixes"],
              },
              etag: {
                type: "string",
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
        If_Match: {
          name: "If Match",
          description:
            'The entity state (ETag) version of the pool to update. This value can be omitted or set to "*" to apply the operation unconditionally.',
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.body;
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.If_Match) {
          additionalHeaders["If-Match"] = String(
            input.event.inputConfig.If_Match,
          );
        }

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkManagers/${input.event.inputConfig.networkManagerName}/ipamPools/${input.event.inputConfig.poolName}` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
          requestBody,
          additionalHeaders,
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
              description: {
                type: "string",
              },
              displayName: {
                type: "string",
              },
              ipAddressType: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              parentPoolName: {
                type: "string",
              },
              addressPrefixes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              provisioningState: {
                type: "string",
              },
            },
            required: ["addressPrefixes"],
          },
          etag: {
            type: "string",
          },
        },
        required: ["properties"],
      },
    },
  },
};

export default IpamPools_Create;
