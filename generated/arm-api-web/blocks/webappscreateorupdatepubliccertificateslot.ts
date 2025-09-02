import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const WebApps_CreateOrUpdatePublicCertificateSlot: AppBlock = {
  name: "Web Apps / Create Or Update Public Certificate Slot",
  description: "Description for Creates a hostname binding for an app.",
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
        publicCertificateName: {
          name: "Public Certificate Name",
          description: "Name of the public certificate",
          type: "string",
          required: true,
        },
        publicCertificate: {
          name: "Public Certificate",
          description:
            "Public certificate details. This is the JSON representation of a PublicCertificate object.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  blob: {
                    type: "string",
                  },
                  publicCertificateLocation: {
                    type: "string",
                  },
                  thumbprint: {
                    type: "string",
                  },
                },
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
        const requestBody = input.event.inputConfig.publicCertificate;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/slots/${input.event.inputConfig.slot}/publicCertificates/${input.event.inputConfig.publicCertificateName}` +
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
              blob: {
                type: "string",
              },
              publicCertificateLocation: {
                type: "string",
              },
              thumbprint: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default WebApps_CreateOrUpdatePublicCertificateSlot;
