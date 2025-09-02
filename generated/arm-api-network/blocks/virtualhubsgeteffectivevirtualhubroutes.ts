import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualHubs_GetEffectiveVirtualHubRoutes: AppBlock = {
  name: "Virtual Hubs / Get Effective Virtual Hub Routes",
  description:
    "Gets the effective routes configured for the Virtual Hub resource or the specified resource .",
  category: "Virtual Hubs",
  inputs: {
    default: {
      config: {
        virtualHubName: {
          name: "Virtual Hub Name",
          description: "Name of the virtual hub",
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
        effectiveRoutesParameters: {
          name: "Effective Routes Parameters",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.effectiveRoutesParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualHubs/${input.event.inputConfig.virtualHubName}/effectiveRoutes` +
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                addressPrefixes: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                nextHops: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                nextHopType: {
                  type: "string",
                },
                asPath: {
                  type: "string",
                },
                routeOrigin: {
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

export default VirtualHubs_GetEffectiveVirtualHubRoutes;
