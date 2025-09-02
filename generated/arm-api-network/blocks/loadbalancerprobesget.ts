import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const LoadBalancerProbes_Get: AppBlock = {
  name: "Load Balancer Probes / Get",
  description: "Gets load balancer probe.",
  category: "Load Balancer Probes",
  inputs: {
    default: {
      config: {
        loadBalancerName: {
          name: "Load Balancer Name",
          description: "Name of the load balancer",
          type: "string",
          required: true,
        },
        probeName: {
          name: "Probe Name",
          description: "Name of the probe",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/loadBalancers/${input.event.inputConfig.loadBalancerName}/probes/${input.event.inputConfig.probeName}` +
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
              loadBalancingRules: {
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
              protocol: {
                type: "string",
              },
              port: {
                type: "integer",
              },
              intervalInSeconds: {
                type: "integer",
              },
              noHealthyBackendsBehavior: {
                type: "string",
              },
              numberOfProbes: {
                type: "integer",
              },
              probeThreshold: {
                type: "integer",
              },
              requestPath: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
            },
            required: ["protocol", "port"],
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

export default LoadBalancerProbes_Get;
