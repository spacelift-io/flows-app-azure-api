import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServicePlans_DeleteVnetRoute: AppBlock = {
  name: "App Service Plans / Delete Vnet Route",
  description:
    "Description for Delete a Virtual Network route in an App Service plan.",
  category: "App Service Plans",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        vnetName: {
          name: "Vnet Name",
          description: "Name of the vnet",
          type: "string",
          required: true,
        },
        routeName: {
          name: "Route Name",
          description: "Name of the route",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/serverfarms/${input.event.inputConfig.name}/virtualNetworkConnections/${input.event.inputConfig.vnetName}/routes/${input.event.inputConfig.routeName}` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "DELETE",
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
        additionalProperties: true,
      },
    },
  },
};

export default AppServicePlans_DeleteVnetRoute;
