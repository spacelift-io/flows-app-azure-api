import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ManagedHsms_GetDeleted: AppBlock = {
  name: "Managed Hsms / Get Deleted",
  description: "Gets the specified deleted managed HSM.",
  category: "Managed Hsms",
  inputs: {
    default: {
      config: {
        location: {
          name: "Location",
          type: "string",
          required: true,
        },
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
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.KeyVault/locations/${input.event.inputConfig.location}/deletedManagedHSMs/${input.event.inputConfig.name}` +
          "?api-version=2023-07-01";

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
              mhsmId: {
                type: "string",
              },
              location: {
                type: "string",
              },
              deletionDate: {
                type: "string",
              },
              scheduledPurgeDate: {
                type: "string",
              },
              purgeProtectionEnabled: {
                type: "boolean",
              },
              tags: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
        },
      },
    },
  },
};

export default ManagedHsms_GetDeleted;
