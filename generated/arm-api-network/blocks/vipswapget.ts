import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VipSwap_Get: AppBlock = {
  name: "Vip Swap / Get",
  description:
    "Gets the SwapResource which identifies the slot type for the specified cloud service. The slot type on a cloud service can either be Staging or Production",
  category: "Vip Swap",
  inputs: {
    default: {
      config: {
        groupName: {
          name: "Group Name",
          description: "Name of the group",
          type: "string",
          required: true,
        },
        resourceName: {
          name: "Resource Name",
          description: "Name of the resource",
          type: "string",
          required: true,
        },
        singletonResource: {
          name: "Singleton Resource",
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.groupName}/providers/Microsoft.Compute/cloudServices/${input.event.inputConfig.resourceName}/providers/Microsoft.Network/cloudServiceSlots/${input.event.inputConfig.singletonResource}` +
          "?api-version=2024-10-01";

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
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          type: {
            type: "string",
          },
          properties: {
            type: "object",
            properties: {
              slotType: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default VipSwap_Get;
