import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceCertificateOrders_RetrieveSiteSeal: AppBlock = {
  name: "App Service Certificate Orders / Retrieve Site Seal",
  description:
    "This method is used to obtain the site seal information for an issued certificate. A site seal is a graphic that the certificate purchaser can embed on their web site to show their visitors information about their SSL certificate. If a web site visitor clicks on the site seal image, a pop-up page is displayed that contains detailed information about the SSL certificate. The site seal token is used to link the site seal graphic image to the appropriate certificate details pop-up page display when a user clicks on the site seal. The site seal images are expected to be static images and hosted by the reseller, to minimize delays for customer page load times.",
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
        siteSealRequest: {
          name: "Site Seal Request",
          description: "Site seal request.",
          type: {
            type: "object",
            properties: {
              lightTheme: {
                type: "boolean",
              },
              locale: {
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
        const requestBody = input.event.inputConfig.siteSealRequest;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/${input.event.inputConfig.certificateOrderName}/retrieveSiteSeal` +
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
        properties: {
          html: {
            type: "string",
          },
        },
        required: ["html"],
      },
    },
  },
};

export default AppServiceCertificateOrders_RetrieveSiteSeal;
