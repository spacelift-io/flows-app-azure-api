import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ExpressRouteCrossConnections_ListRoutesTable: AppBlock = {
  name: "Express Route Cross Connections / List Routes Table",
  description:
    "Gets the currently advertised routes table associated with the express route cross connection in a resource group.",
  category: "Express Route Cross Connections",
  inputs: {
    default: {
      config: {
        crossConnectionName: {
          name: "Cross Connection Name",
          description: "Name of the cross connection",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/expressRouteCrossConnections/${input.event.inputConfig.crossConnectionName}/peerings/${input.event.inputConfig.peeringName}/routeTables/${input.event.inputConfig.devicePath}` +
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
                network: {
                  type: "string",
                },
                nextHop: {
                  type: "string",
                },
                locPrf: {
                  type: "string",
                },
                weight: {
                  type: "integer",
                },
                path: {
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

export default ExpressRouteCrossConnections_ListRoutesTable;
