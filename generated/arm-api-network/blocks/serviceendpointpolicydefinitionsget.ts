import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ServiceEndpointPolicyDefinitions_Get: AppBlock = {
  name: "Service Endpoint Policy Definitions / Get",
  description:
    "Get the specified service endpoint policy definitions from service endpoint policy.",
  category: "Service Endpoint Policy Definitions",
  inputs: {
    default: {
      config: {
        serviceEndpointPolicyName: {
          name: "Service Endpoint Policy Name",
          description: "Name of the service endpoint policy",
          type: "string",
          required: true,
        },
        serviceEndpointPolicyDefinitionName: {
          name: "Service Endpoint Policy Definition Name",
          description: "Name of the service endpoint policy definition",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/serviceEndpointPolicies/${input.event.inputConfig.serviceEndpointPolicyName}/serviceEndpointPolicyDefinitions/${input.event.inputConfig.serviceEndpointPolicyDefinitionName}` +
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
              description: {
                type: "string",
              },
              service: {
                type: "string",
              },
              serviceResources: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              provisioningState: {
                type: "string",
              },
            },
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

export default ServiceEndpointPolicyDefinitions_Get;
