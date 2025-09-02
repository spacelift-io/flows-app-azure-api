import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRouteCircuits_ListArpTable: AppBlock = {
  name: "Express Route Circuits / List Arp Table",
  description:
    "Gets the currently advertised ARP table associated with the express route circuit in a resource group.",
  category: "Express Route Circuits",
  inputs: {
    default: {
      config: {
        circuitName: {
          name: "Circuit Name",
          description: "Name of the circuit",
          type: "string",
          required: true,
        },
        peeringName: {
          name: "Peering Name",
          description: "Name of the peering",
          type: "string",
          required: true,
        },
        devicePath: {
          name: "Device Path",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/expressRouteCircuits/${input.event.inputConfig.circuitName}/peerings/${input.event.inputConfig.peeringName}/arpTables/${input.event.inputConfig.devicePath}` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                age: {
                  type: "integer",
                },
                interface: {
                  type: "string",
                },
                ipAddress: {
                  type: "string",
                },
                macAddress: {
                  type: "string",
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ExpressRouteCircuits_ListArpTable;
