import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AvailabilitySets_ListAvailableSizes: AppBlock = {
  name: "Availability Sets / List Available Sizes",
  description:
    "Lists all available virtual machine sizes that can be used to create a new virtual machine in an existing availability set.",
  category: "Availability Sets",
  inputs: {
    default: {
      config: {
        availabilitySetName: {
          name: "Availability Set Name",
          description: "Name of the availability set",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/availabilitySets/${input.event.inputConfig.availabilitySetName}/vmSizes` +
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
                numberOfCores: {
                  type: "integer",
                },
                osDiskSizeInMB: {
                  type: "integer",
                },
                resourceDiskSizeInMB: {
                  type: "integer",
                },
                memoryInMB: {
                  type: "integer",
                },
                maxDataDiskCount: {
                  type: "integer",
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

export default AvailabilitySets_ListAvailableSizes;
