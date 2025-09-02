import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualHubRouteTableV2s_CreateOrUpdate: AppBlock = {
  name: "Virtual Hub Route Table V2s / Create Or Update",
  description:
    "Creates a VirtualHubRouteTableV2 resource if it doesn't exist else updates the existing VirtualHubRouteTableV2.",
  category: "Virtual Hub Route Table V2s",
  inputs: {
    default: {
      config: {
        virtualHubName: {
          name: "Virtual Hub Name",
          description: "Name of the virtual hub",
          type: "string",
          required: true,
        },
        routeTableName: {
          name: "Route Table Name",
          description: "Name of the route table",
          type: "string",
          required: true,
        },
        virtualHubRouteTableV2Parameters: {
          name: "Virtual Hub Route Table V2parameters",
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
        const requestBody =
          input.event.inputConfig.virtualHubRouteTableV2Parameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualHubs/${input.event.inputConfig.virtualHubName}/routeTables/${input.event.inputConfig.routeTableName}` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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
          properties: {
            type: "object",
            properties: {
              routes: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    destinationType: {
                      type: "string",
                    },
                    destinations: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    nextHopType: {
                      type: "string",
                    },
                    nextHops: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                  },
                },
              },
              attachedConnections: {
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
        },
      },
    },
  },
};

export default VirtualHubRouteTableV2s_CreateOrUpdate;
