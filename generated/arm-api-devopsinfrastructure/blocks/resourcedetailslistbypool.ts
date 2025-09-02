import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ResourceDetails_ListByPool: AppBlock = {
  name: "Resource Details / List By Pool",
  description: "List ResourceDetailsObject resources by Pool",
  category: "Resource Details",
  inputs: {
    default: {
      config: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.DevOpsInfrastructure/pools/${input.event.inputConfig.poolName}/resources` +
          "?api-version=2025-01-21";

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
                    status: {
                      type: "string",
                    },
                    image: {
                      type: "string",
                    },
                    imageVersion: {
                      type: "string",
                    },
                  },
                  required: ["status", "image", "imageVersion"],
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default ResourceDetails_ListByPool;
