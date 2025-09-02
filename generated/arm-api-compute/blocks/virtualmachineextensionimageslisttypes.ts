import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachineExtensionImages_ListTypes: AppBlock = {
  name: "Virtual Machine Extension Images / List Types",
  description: "Gets a list of virtual machine extension image types.",
  category: "Virtual Machine Extension Images",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        publisherName: {
          name: "Publisher Name",
          description: "Name of the publisher",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/locations/${input.event.inputConfig.location}/publishers/${input.event.inputConfig.publisherName}/artifacttypes/vmextension/types` +
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
        type: "array",
        items: {
          type: "object",
          properties: {
            properties: {
              type: "object",
              properties: {
                operatingSystem: {
                  type: "string",
                },
                computeRole: {
                  type: "string",
                },
                handlerSchema: {
                  type: "string",
                },
                vmScaleSetEnabled: {
                  type: "boolean",
                },
                supportsMultipleExtensions: {
                  type: "boolean",
                },
              },
              required: ["operatingSystem", "computeRole", "handlerSchema"],
            },
          },
        },
      },
    },
  },
};

export default VirtualMachineExtensionImages_ListTypes;
