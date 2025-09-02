import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_GetVnetConnectionSlot: AppBlock = {
  name: "Web Apps / Get Vnet Connection Slot",
  description:
    "Description for Gets a virtual network the app (or deployment slot) is connected to by name.",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        slot: {
          name: "Slot",
          type: "string",
          required: true,
        },
        vnetName: {
          name: "Vnet Name",
          description: "Name of the vnet",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/virtualNetworkConnections/${input.event.inputConfig.vnetName}` +
          "?api-version=2024-11-01";

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
              vnetResourceId: {
                type: "string",
              },
              certThumbprint: {
                type: "string",
              },
              certBlob: {
                type: "string",
              },
              routes: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    properties: {
                      type: "object",
                      properties: {
                        startAddress: {
                          type: "string",
                        },
                        endAddress: {
                          type: "string",
                        },
                        routeType: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
              resyncRequired: {
                type: "boolean",
              },
              dnsServers: {
                type: "string",
              },
              isSwift: {
                type: "boolean",
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_GetVnetConnectionSlot;
