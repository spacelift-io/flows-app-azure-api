import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualRouters_Get: AppBlock = {
  name: "Virtual Routers / Get",
  description: "Gets the specified Virtual Router.",
  category: "Virtual Routers",
  inputs: {
    default: {
      config: {
        virtualRouterName: {
          name: "Virtual Router Name",
          description: "Name of the virtual router",
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
        $expand: {
          name: "Expand",
          description: "Expands referenced resources.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualRouters/${input.event.inputConfig.virtualRouterName}` +
          "?api-version=2024-10-01" +
          (input.event.inputConfig.$expand
            ? `&$expand=${input.event.inputConfig.$expand}`
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
          properties: {
            type: "object",
            properties: {
              virtualRouterAsn: {
                type: "integer",
              },
              virtualRouterIps: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              hostedSubnet: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                },
              },
              hostedGateway: {
                type: "object",
                properties: {
                  id: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
              peerings: {
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
              provisioningState: {
                type: "string",
              },
            },
          },
          etag: {
            type: "string",
          },
        },
      },
    },
  },
};

export default VirtualRouters_Get;
