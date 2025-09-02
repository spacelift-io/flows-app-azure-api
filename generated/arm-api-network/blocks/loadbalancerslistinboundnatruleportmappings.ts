import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LoadBalancers_ListInboundNatRulePortMappings: AppBlock = {
  name: "Load Balancers / List Inbound Nat Rule Port Mappings",
  description: "List of inbound NAT rule port mappings.",
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
        backendPoolName: {
          name: "Backend Pool Name",
          description: "Name of the backend pool",
          type: "string",
          required: true,
        },
        parameters: {
          name: "Parameters",
          description: "Query inbound NAT rule port mapping request.",
          type: {
            type: "object",
            properties: {
              ipConfiguration: {
                type: "string",
              },
              ipAddress: {
                type: "string",
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
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.groupName}/providers/Microsoft.Network/loadBalancers/${input.event.inputConfig.loadBalancerName}/backendAddressPools/${input.event.inputConfig.backendPoolName}/queryInboundNatRulePortMapping` +
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
          inboundNatRulePortMappings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                inboundNatRuleName: {
                  type: "string",
                },
                protocol: {
                  type: "string",
                },
                frontendPort: {
                  type: "integer",
                },
                backendPort: {
                  type: "integer",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default LoadBalancers_ListInboundNatRulePortMappings;
