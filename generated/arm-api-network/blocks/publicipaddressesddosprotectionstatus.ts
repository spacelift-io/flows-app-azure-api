import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PublicIPAddresses_DdosProtectionStatus: AppBlock = {
  name: "Public IP Addresses / Ddos Protection Status",
  description: "Gets the Ddos Protection Status of a Public IP Address",
  category: "Public IP Addresses",
  inputs: {
    default: {
      config: {
        publicIpAddressName: {
          name: "Public IP Address Name",
          description: "Name of the public ip address",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Network/publicIPAddresses/${input.event.inputConfig.publicIpAddressName}/ddosProtectionStatus` +
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
          publicIpAddressId: {
            type: "string",
          },
          publicIpAddress: {
            type: "string",
          },
          isWorkloadProtected: {
            type: "string",
          },
          ddosProtectionPlanId: {
            type: "string",
          },
        },
      },
    },
  },
};

export default PublicIPAddresses_DdosProtectionStatus;
