import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const NetworkVirtualAppliances_Restart: AppBlock = {
  name: "Network Virtual Appliances / Restart",
  description:
    "Restarts one or more VMs belonging to the specified Network Virtual Appliance.",
  category: "Network Virtual Appliances",
  inputs: {
    default: {
      config: {
        networkVirtualApplianceName: {
          name: "Network Virtual Appliance Name",
          description: "Name of the network virtual appliance",
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
        NetworkVirtualApplianceInstanceIds: {
          name: "Network Virtual Appliance Instance Ids",
          description:
            "Specifies a list of virtual machine instance IDs from the Network Virtual Appliance VM instances.",
          type: {
            type: "object",
            properties: {
              instanceIds: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody =
          input.event.inputConfig.NetworkVirtualApplianceInstanceIds;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/${input.event.inputConfig.networkVirtualApplianceName}/restart` +
          "?api-version=2024-10-01";

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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
          instanceIds: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

export default NetworkVirtualAppliances_Restart;
