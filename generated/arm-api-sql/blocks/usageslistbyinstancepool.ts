import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Usages_ListByInstancePool: AppBlock = {
  name: "Usages / List By Instance Pool",
  description: "Gets all instance pool usage metrics",
  category: "Usages",
  inputs: {
    default: {
      config: {
        instancePoolName: {
          name: "Instance Pool Name",
          description: "Name of the instance pool",
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
        expandChildren: {
          name: "Expand Children",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Sql/instancePools/${input.event.inputConfig.instancePoolName}/usages` +
          "?api-version=2023-08-01" +
          (input.event.inputConfig.expandChildren
            ? `&expandChildren=${input.event.inputConfig.expandChildren}`
            : "");

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
                id: {
                  type: "string",
                },
                name: {
                  type: "object",
                  properties: {
                    value: {
                      type: "string",
                    },
                    localizedValue: {
                      type: "string",
                    },
                  },
                },
                type: {
                  type: "string",
                },
                unit: {
                  type: "string",
                },
                currentValue: {
                  type: "integer",
                },
                limit: {
                  type: "integer",
                },
                requestedLimit: {
                  type: "integer",
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

export default Usages_ListByInstancePool;
