import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_CreateOrUpdateVnetConnectionGatewaySlot: AppBlock = {
  name: "Web Apps / Create Or Update Vnet Connection Gateway Slot",
  description:
    "Description for Adds a gateway to a connected Virtual Network (PUT) or updates it (PATCH).",
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
        gatewayName: {
          name: "Gateway Name",
          description: "Name of the gateway",
          type: "string",
          required: true,
        },
        connectionEnvelope: {
          name: "Connection Envelope",
          description: "The properties to update this gateway with.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  vnetName: {
                    type: "string",
                  },
                  vpnPackageUri: {
                    type: "string",
                  },
                },
                required: ["vpnPackageUri"],
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
        resourceGroupName: {
          name: "Resource Group Name",
          description:
            "Azure resource group name (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.connectionEnvelope;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/virtualNetworkConnections/${input.event.inputConfig.vnetName}/gateways/${input.event.inputConfig.gatewayName}` +
          "?api-version=2024-11-01";

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
              vnetName: {
                type: "string",
              },
              vpnPackageUri: {
                type: "string",
              },
            },
            required: ["vpnPackageUri"],
          },
        },
      },
    },
  },
};

export default WebApps_CreateOrUpdateVnetConnectionGatewaySlot;
