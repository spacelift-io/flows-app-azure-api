import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_GetHybridConnectionSlot: AppBlock = {
  name: "Web Apps / Get Hybrid Connection Slot",
  description:
    "Description for Retrieves a specific Service Bus Hybrid Connection used by this Web App.",
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
        namespaceName: {
          name: "Namespace Name",
          description: "Name of the namespace",
          type: "string",
          required: true,
        },
        relayName: {
          name: "Relay Name",
          description: "Name of the relay",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/hybridConnectionNamespaces/${input.event.inputConfig.namespaceName}/relays/${input.event.inputConfig.relayName}` +
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
              serviceBusNamespace: {
                type: "string",
              },
              relayName: {
                type: "string",
              },
              relayArmUri: {
                type: "string",
              },
              hostname: {
                type: "string",
              },
              port: {
                type: "integer",
              },
              sendKeyName: {
                type: "string",
              },
              sendKeyValue: {
                type: "string",
              },
              serviceBusSuffix: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_GetHybridConnectionSlot;
