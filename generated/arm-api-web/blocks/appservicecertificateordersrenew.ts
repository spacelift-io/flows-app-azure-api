import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceCertificateOrders_Renew: AppBlock = {
  name: "App Service Certificate Orders / Renew",
  description: "Description for Renew an existing certificate order.",
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
        renewCertificateOrderRequest: {
          name: "Renew Certificate Order Request",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  keySize: {
                    type: "number",
                  },
                  csr: {
                    type: "string",
                  },
                  isPrivateKeyExternal: {
                    type: "boolean",
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
        const requestBody =
          input.event.inputConfig.renewCertificateOrderRequest;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/${input.event.inputConfig.certificateOrderName}/renew` +
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

export default AppServiceCertificateOrders_Renew;
