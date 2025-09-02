import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_UpdateFtpAllowedSlot: AppBlock = {
  name: "Web Apps / Update Ftp Allowed Slot",
  description:
    "Description for Updates whether FTP is allowed on the site or not.",
  category: "Web Apps",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        slot: {
          name: "Slot",
          type: "string",
          required: true,
        },
        csmPublishingAccessPoliciesEntity: {
          name: "Csm Publishing Access Policies Entity",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  allow: {
                    type: "boolean",
                  },
                },
                required: ["allow"],
              },
            },
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
        resourceGroupName: {
          name: "Resource Group Name",
          description:
            "Azure resource group name (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody =
          input.event.inputConfig.csmPublishingAccessPoliciesEntity;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/basicPublishingCredentialsPolicies/ftp` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
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
          properties: {
            type: "object",
            properties: {
              allow: {
                type: "boolean",
              },
            },
            required: ["allow"],
          },
        },
      },
    },
  },
};

export default WebApps_UpdateFtpAllowedSlot;
