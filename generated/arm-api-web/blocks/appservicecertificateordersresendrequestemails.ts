import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceCertificateOrders_ResendRequestEmails: AppBlock = {
  name: "App Service Certificate Orders / Resend Request Emails",
  description:
    "Resend domain verification ownership email containing steps on how to verify a domain for a given certificate order",
  category: "App Service Certificate Orders",
  inputs: {
    default: {
      config: {
        certificateOrderName: {
          name: "Certificate Order Name",
          description: "Name of the certificate order",
          type: "string",
          required: true,
        },
        nameIdentifier: {
          name: "Name Identifier",
          description: "Email address",
          type: {
            type: "object",
            properties: {
              name: {
                type: "string",
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
        const requestBody = input.event.inputConfig.nameIdentifier;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/${input.event.inputConfig.certificateOrderName}/resendRequestEmails` +
          "?api-version=2024-11-01";

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
        additionalProperties: true,
      },
    },
  },
};

export default AppServiceCertificateOrders_ResendRequestEmails;
