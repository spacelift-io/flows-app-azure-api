import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const SiteCertificates_Update: AppBlock = {
  name: "Site Certificates / Update",
  description: "Create or update a certificate under a given site.",
  category: "Site Certificates",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        certificateName: {
          name: "Certificate Name",
          description: "Name of the certificate",
          type: "string",
          required: true,
        },
        certificateEnvelope: {
          name: "Certificate Envelope",
          description: "Details of certificate, if it exists already.",
          type: {
            type: "object",
            properties: {
              properties: {
                type: "object",
                properties: {
                  password: {
                    type: "string",
                  },
                  friendlyName: {
                    type: "string",
                  },
                  subjectName: {
                    type: "string",
                  },
                  hostNames: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  pfxBlob: {
                    type: "string",
                  },
                  siteName: {
                    type: "string",
                  },
                  selfLink: {
                    type: "string",
                  },
                  issuer: {
                    type: "string",
                  },
                  issueDate: {
                    type: "string",
                  },
                  expirationDate: {
                    type: "string",
                  },
                  thumbprint: {
                    type: "string",
                  },
                  valid: {
                    type: "boolean",
                  },
                  cerBlob: {
                    type: "string",
                  },
                  publicKeyHash: {
                    type: "string",
                  },
                  hostingEnvironmentProfile: {
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
                    },
                  },
                  keyVaultId: {
                    type: "string",
                  },
                  keyVaultSecretName: {
                    type: "string",
                  },
                  keyVaultSecretStatus: {
                    type: "string",
                  },
                  serverFarmId: {
                    type: "string",
                  },
                  canonicalName: {
                    type: "string",
                  },
                  domainValidationMethod: {
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
        const requestBody = input.event.inputConfig.certificateEnvelope;

        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/resourceGroups/${input.event.inputConfig.resourceGroupName || input.app.config.resourceGroupName}/providers/Microsoft.Web/sites/${input.event.inputConfig.name}/certificates/${input.event.inputConfig.certificateName}` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PATCH",
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
              password: {
                type: "string",
              },
              friendlyName: {
                type: "string",
              },
              subjectName: {
                type: "string",
              },
              hostNames: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              pfxBlob: {
                type: "string",
              },
              siteName: {
                type: "string",
              },
              selfLink: {
                type: "string",
              },
              issuer: {
                type: "string",
              },
              issueDate: {
                type: "string",
              },
              expirationDate: {
                type: "string",
              },
              thumbprint: {
                type: "string",
              },
              valid: {
                type: "boolean",
              },
              cerBlob: {
                type: "string",
              },
              publicKeyHash: {
                type: "string",
              },
              hostingEnvironmentProfile: {
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
                },
              },
              keyVaultId: {
                type: "string",
              },
              keyVaultSecretName: {
                type: "string",
              },
              keyVaultSecretStatus: {
                type: "string",
              },
              serverFarmId: {
                type: "string",
              },
              canonicalName: {
                type: "string",
              },
              domainValidationMethod: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default SiteCertificates_Update;
