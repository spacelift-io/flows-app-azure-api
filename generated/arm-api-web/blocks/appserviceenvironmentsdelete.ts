import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceEnvironments_Delete: AppBlock = {
  name: "App Service Environments / Delete",
  description: "Description for Delete an App Service Environment.",
  category: "App Service Environments",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
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
        forceDelete: {
          name: "Force Delete",
          description:
            "Specify <code>true</code> to force the deletion even if the App Service Environment contains resources. The default is <code>false</code>.",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/${input.event.inputConfig.name}` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.forceDelete
            ? `&forceDelete=${input.event.inputConfig.forceDelete}`
            : "");

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

export default AppServiceEnvironments_Delete;
