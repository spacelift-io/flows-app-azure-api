import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceCertificateOrders_ValidatePurchaseInformation: AppBlock = {
  name: "App Service Certificate Orders / Validate Purchase Information",
  description: "Description for Validate information for a certificate order.",
  category: "App Service Certificate Orders",
  inputs: {
    default: {
      config: {
        appServiceCertificateOrder: {
          name: "App Service Certificate Order",
          description: "Information for a certificate order.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  certificates: {
                    type: "object",
                    additionalProperties: true,
                  },
                  distinguishedName: {
                    type: "string",
                  },
                  domainVerificationToken: {
                    type: "string",
                  },
                  validityInYears: {
                    type: "number",
                  },
                  keySize: {
                    type: "number",
                  },
                  productType: {
                    type: "string",
                  },
                  autoRenew: {
                    type: "boolean",
                  },
                  provisioningState: {
                    type: "string",
                  },
                  status: {
                    type: "string",
                  },
                  signedCertificate: {
                    type: "object",
                    properties: {
                      version: {
                        type: "number",
                      },
                      serialNumber: {
                        type: "string",
                      },
                      thumbprint: {
                        type: "string",
                      },
                      subject: {
                        type: "string",
                      },
                      notBefore: {
                        type: "string",
                      },
                      notAfter: {
                        type: "string",
                      },
                      signatureAlgorithm: {
                        type: "string",
                      },
                      issuer: {
                        type: "string",
                      },
                      rawData: {
                        type: "string",
                      },
                    },
                  },
                  csr: {
                    type: "string",
                  },
                  intermediate: {
                    type: "object",
                    properties: {
                      version: {
                        type: "object",
                        additionalProperties: true,
                      },
                      serialNumber: {
                        type: "object",
                        additionalProperties: true,
                      },
                      thumbprint: {
                        type: "object",
                        additionalProperties: true,
                      },
                      subject: {
                        type: "object",
                        additionalProperties: true,
                      },
                      notBefore: {
                        type: "object",
                        additionalProperties: true,
                      },
                      notAfter: {
                        type: "object",
                        additionalProperties: true,
                      },
                      signatureAlgorithm: {
                        type: "object",
                        additionalProperties: true,
                      },
                      issuer: {
                        type: "object",
                        additionalProperties: true,
                      },
                      rawData: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                  },
                  root: {
                    type: "object",
                    properties: {
                      version: {
                        type: "object",
                        additionalProperties: true,
                      },
                      serialNumber: {
                        type: "object",
                        additionalProperties: true,
                      },
                      thumbprint: {
                        type: "object",
                        additionalProperties: true,
                      },
                      subject: {
                        type: "object",
                        additionalProperties: true,
                      },
                      notBefore: {
                        type: "object",
                        additionalProperties: true,
                      },
                      notAfter: {
                        type: "object",
                        additionalProperties: true,
                      },
                      signatureAlgorithm: {
                        type: "object",
                        additionalProperties: true,
                      },
                      issuer: {
                        type: "object",
                        additionalProperties: true,
                      },
                      rawData: {
                        type: "object",
                        additionalProperties: true,
                      },
                    },
                  },
                  serialNumber: {
                    type: "string",
                  },
                  lastCertificateIssuanceTime: {
                    type: "string",
                  },
                  expirationTime: {
                    type: "string",
                  },
                  isPrivateKeyExternal: {
                    type: "boolean",
                  },
                  appServiceCertificateNotRenewableReasons: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  nextAutoRenewalTimeStamp: {
                    type: "string",
                  },
                  contact: {
                    type: "object",
                    properties: {
                      email: {
                        type: "string",
                      },
                      nameFirst: {
                        type: "string",
                      },
                      nameLast: {
                        type: "string",
                      },
                      phone: {
                        type: "string",
                      },
                    },
                  },
                },
                required: ["productType"],
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
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.appServiceCertificateOrder;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.CertificateRegistration/validateCertificateRegistrationInformation` +
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

export default AppServiceCertificateOrders_ValidatePurchaseInformation;
