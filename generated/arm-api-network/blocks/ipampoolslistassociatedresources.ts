import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const IpamPools_ListAssociatedResources: AppBlock = {
  name: "Ipam Pools / List Associated Resources",
  description: "List Associated Resource in the Pool.",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkManagers/${input.event.inputConfig.networkManagerName}/ipamPools/${input.event.inputConfig.poolName}/listAssociatedResources` +
          "?api-version=2024-10-01";

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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                resourceId: {
                  type: "string",
                },
                poolId: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                addressPrefixes: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                reservedPrefixes: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                totalNumberOfIPAddresses: {
                  type: "string",
                },
                numberOfReservedIPAddresses: {
                  type: "string",
                },
                createdAt: {
                  type: "string",
                },
                reservationExpiresAt: {
                  type: "string",
                },
              },
              required: ["resourceId"],
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

export default IpamPools_ListAssociatedResources;
