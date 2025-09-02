import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const VirtualMachineRunCommands_Get: AppBlock = {
  name: "Virtual Machine Run Commands / Get",
  description: "Gets specific run command for a subscription in a location.",
  category: "Virtual Machine Run Commands",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
        commandId: {
          name: "Command ID",
          description: "Unique identifier",
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
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Compute/locations/${input.event.inputConfig.location}/runCommands/${input.event.inputConfig.commandId}` +
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
          script: {
            type: "array",
            items: {
              type: "string",
            },
          },
          parameters: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                defaultValue: {
                  type: "string",
                },
                required: {
                  type: "boolean",
                },
              },
              required: ["name", "type"],
            },
          },
        },
        required: ["script"],
      },
    },
  },
};

export default VirtualMachineRunCommands_Get;
