import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const AppServiceCertificateOrders_CreateOrUpdate: AppBlock = {
  name: "App Service Certificate Orders / Create Or Update",
  description: "Description for Create or update a certificate purchase order.",
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
        certificateDistinguishedName: {
          name: "Certificate Distinguished Name",
          description: "Distinguished name to use for the certificate order.",
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
          input.event.inputConfig.certificateDistinguishedName;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.CertificateRegistration/certificateOrders/${input.event.inputConfig.certificateOrderName}` +
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
                type: "integer",
              },
              keySize: {
                type: "integer",
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
                    type: "integer",
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
    },
  },
};

export default AppServiceCertificateOrders_CreateOrUpdate;
