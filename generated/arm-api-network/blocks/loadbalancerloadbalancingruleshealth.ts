import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LoadBalancerLoadBalancingRules_Health: AppBlock = {
  name: "Load Balancer Load Balancing Rules / Health",
  description: "Get health details of a load balancing rule.",
  category: "Load Balancer Load Balancing Rules",
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
        loadBalancingRuleName: {
          name: "Load Balancing Rule Name",
          description: "Name of the load balancing rule",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.groupName}/providers/Microsoft.Network/loadBalancers/${input.event.inputConfig.loadBalancerName}/loadBalancingRules/${input.event.inputConfig.loadBalancingRuleName}/health` +
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
          up: {
            type: "integer",
          },
          down: {
            type: "integer",
          },
          loadBalancerBackendAddresses: {
            type: "array",
            items: {
              type: "object",
              properties: {
                ipAddress: {
                  type: "string",
                },
                networkInterfaceIPConfigurationId: {
                  type: "string",
                },
                state: {
                  type: "string",
                },
                reason: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default LoadBalancerLoadBalancingRules_Health;
