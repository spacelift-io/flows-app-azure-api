import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const DedicatedHosts_ListAvailableSizes: AppBlock = {
  name: "Dedicated Hosts / List Available Sizes",
  description:
    "Lists all available dedicated host sizes to which the specified dedicated host can be resized. NOTE: The dedicated host sizes provided can be used to only scale up the existing dedicated host.",
  category: "Dedicated Hosts",
  inputs: {
    default: {
      config: {
        hostGroupName: {
          name: "Host Group Name",
          description: "Name of the host group",
          type: "string",
          required: true,
        },
        hostName: {
          name: "Host Name",
          description: "Name of the host",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Compute/hostGroups/${input.event.inputConfig.hostGroupName}/hosts/${input.event.inputConfig.hostName}/hostSizes` +
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
              type: "string",
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

export default DedicatedHosts_ListAvailableSizes;
