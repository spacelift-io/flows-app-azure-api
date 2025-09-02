import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LoadBalancerOutboundRules_Get: AppBlock = {
  name: "Load Balancer Outbound Rules / Get",
  description: "Gets the specified load balancer outbound rule.",
  category: "Load Balancer Outbound Rules",
  inputs: {
    default: {
      config: {
        loadBalancerName: {
          name: "Load Balancer Name",
          description: "Name of the load balancer",
          type: "string",
          required: true,
        },
        outboundRuleName: {
          name: "Outbound Rule Name",
          description: "Name of the outbound rule",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/loadBalancers/${input.event.inputConfig.loadBalancerName}/outboundRules/${input.event.inputConfig.outboundRuleName}` +
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
              allocatedOutboundPorts: {
                type: "integer",
              },
              frontendIPConfigurations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                    },
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
              provisioningState: {
                type: "string",
              },
              protocol: {
                type: "string",
              },
              enableTcpReset: {
                type: "boolean",
              },
              idleTimeoutInMinutes: {
                type: "integer",
              },
            },
            required: [
              "backendAddressPool",
              "frontendIPConfigurations",
              "protocol",
            ],
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

export default LoadBalancerOutboundRules_Get;
