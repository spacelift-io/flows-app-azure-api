import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const StaticCidrs_Create: AppBlock = {
  name: "Static Cidrs / Create",
  description: "Creates/Updates the Static CIDR resource.",
  category: "Static Cidrs",
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
        staticCidrName: {
          name: "Static Cidr Name",
          description: "Name of the static cidr",
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
        body: {
          name: "Body",
          description: "StaticCidr resource object to create/update.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  description: {
                    type: "string",
                  },
                  numberOfIPAddressesToAllocate: {
                    type: "string",
                  },
                  addressPrefixes: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  totalNumberOfIPAddresses: {
                    type: "string",
                  },
                  provisioningState: {
                    type: "string",
                  },
                },
              },
            },
          },
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.body;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkManagers/${input.event.inputConfig.networkManagerName}/ipamPools/${input.event.inputConfig.poolName}/staticCidrs/${input.event.inputConfig.staticCidrName}` +
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
              description: {
                type: "string",
              },
              numberOfIPAddressesToAllocate: {
                type: "string",
              },
              addressPrefixes: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              totalNumberOfIPAddresses: {
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

export default StaticCidrs_Create;
