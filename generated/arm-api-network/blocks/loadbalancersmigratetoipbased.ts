import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LoadBalancers_MigrateToIpBased: AppBlock = {
  name: "Load Balancers / Migrate To Ip Based",
  description: "Migrate load balancer to IP Based",
  category: "Load Balancers",
  inputs: {
    default: {
      config: {
        groupName: {
          name: "Group Name",
          description: "Name of the group",
          type: "string",
          required: true,
        },
        loadBalancerName: {
          name: "Load Balancer Name",
          description: "Name of the load balancer",
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
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              pools: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.groupName}/providers/Microsoft.Network/loadBalancers/${input.event.inputConfig.loadBalancerName}/migrateToIpBased` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          migratedPools: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

export default LoadBalancers_MigrateToIpBased;
