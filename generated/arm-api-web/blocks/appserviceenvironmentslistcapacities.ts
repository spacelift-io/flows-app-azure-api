import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceEnvironments_ListCapacities: AppBlock = {
  name: "App Service Environments / List Capacities",
  description:
    "Description for Get the used, available, and total worker capacity an App Service Environment.",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/hostingEnvironments/${input.event.inputConfig.name}/capacities/compute` +
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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                availableCapacity: {
                  type: "integer",
                },
                totalCapacity: {
                  type: "integer",
                },
                unit: {
                  type: "string",
                },
                computeMode: {
                  type: "string",
                },
                workerSize: {
                  type: "string",
                },
                workerSizeId: {
                  type: "integer",
                },
                excludeFromCapacityAllocation: {
                  type: "boolean",
                },
                isApplicableForAllComputeModes: {
                  type: "boolean",
                },
                siteMode: {
                  type: "string",
                },
                isLinux: {
                  type: "boolean",
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default AppServiceEnvironments_ListCapacities;
