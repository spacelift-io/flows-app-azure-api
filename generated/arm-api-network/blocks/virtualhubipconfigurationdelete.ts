import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualHubIpConfiguration_Delete: AppBlock = {
  name: "Virtual Hub Ip Configuration / Delete",
  description: "Deletes a VirtualHubIpConfiguration.",
  category: "Virtual Hub Ip Configuration",
  inputs: {
    default: {
      config: {
        virtualHubName: {
          name: "Virtual Hub Name",
          description: "Name of the virtual hub",
          type: "string",
          required: true,
        },
        ipConfigName: {
          name: "IP Config Name",
          description: "Name of the ip config",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/virtualHubs/${input.event.inputConfig.virtualHubName}/ipConfigurations/${input.event.inputConfig.ipConfigName}` +
          "?api-version=2024-10-01";

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

export default VirtualHubIpConfiguration_Delete;
