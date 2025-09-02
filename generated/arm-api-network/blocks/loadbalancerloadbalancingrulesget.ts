import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LoadBalancerLoadBalancingRules_Get: AppBlock = {
  name: "Load Balancer Load Balancing Rules / Get",
  description: "Gets the specified load balancer load balancing rule.",
  category: "Load Balancer Load Balancing Rules",
  inputs: {
    default: {
      config: {
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/loadBalancers/${input.event.inputConfig.loadBalancerName}/loadBalancingRules/${input.event.inputConfig.loadBalancingRuleName}` +
          "?api-version=2024-10-01";

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
          properties: {
            type: "object",
            properties: {
              frontendIPConfiguration: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
              backendAddressPool: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              backendAddressPools: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "object",
                      additionalProperties: true,
                    },
                  },
                },
              },
              probe: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              protocol: {
                type: "string",
              },
              loadDistribution: {
                type: "string",
              },
              frontendPort: {
                type: "integer",
              },
              backendPort: {
                type: "integer",
              },
              idleTimeoutInMinutes: {
                type: "integer",
              },
              enableFloatingIP: {
                type: "boolean",
              },
              enableTcpReset: {
                type: "boolean",
              },
              disableOutboundSnat: {
                type: "boolean",
              },
              enableConnectionTracking: {
                type: "boolean",
              },
              provisioningState: {
                type: "string",
              },
            },
            required: ["protocol", "frontendPort"],
          },
          name: {
            type: "string",
          },
          etag: {
            type: "string",
          },
          type: {
            type: "string",
          },
        },
      },
    },
  },
};

export default LoadBalancerLoadBalancingRules_Get;
