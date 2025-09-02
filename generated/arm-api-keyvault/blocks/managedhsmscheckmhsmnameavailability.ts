import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedHsms_CheckMhsmNameAvailability: AppBlock = {
  name: "Managed Hsms / Check Mhsm Name Availability",
  description:
    "Checks that the managed hsm name is valid and is not already in use.",
  category: "Managed Hsms",
  inputs: {
    default: {
      config: {
        mhsmName: {
          name: "Mhsm Name",
          description: "The name of the managed hsm.",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
            },
            required: ["name"],
          },
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
        const requestBody = input.event.inputConfig.mhsmName;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.KeyVault/checkMhsmNameAvailability` +
          "?api-version=2023-07-01";

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
          nameAvailable: {
            type: "boolean",
          },
          reason: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
      },
    },
  },
};

export default ManagedHsms_CheckMhsmNameAvailability;
