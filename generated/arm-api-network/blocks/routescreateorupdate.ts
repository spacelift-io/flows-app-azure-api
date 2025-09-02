import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Routes_CreateOrUpdate: AppBlock = {
  name: "Routes / Create Or Update",
  description: "Creates or updates a route in the specified route table.",
  category: "Routes",
  inputs: {
    default: {
      config: {
        routeTableName: {
          name: "Route Table Name",
          description: "Name of the route table",
          type: "string",
          required: true,
        },
        routeName: {
          name: "Route Name",
          description: "Name of the route",
          type: "string",
          required: true,
        },
        routeParameters: {
          name: "Route Parameters",
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
        const requestBody = input.event.inputConfig.routeParameters;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/routeTables/${input.event.inputConfig.routeTableName}/routes/${input.event.inputConfig.routeName}` +
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
              addressPrefix: {
                type: "string",
              },
              nextHopType: {
                type: "string",
              },
              nextHopIpAddress: {
                type: "string",
              },
              provisioningState: {
                type: "string",
              },
              hasBgpOverride: {
                type: "boolean",
              },
            },
            required: ["nextHopType"],
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

export default Routes_CreateOrUpdate;
