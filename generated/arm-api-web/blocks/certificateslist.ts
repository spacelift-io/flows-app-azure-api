import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Certificates_List: AppBlock = {
  name: "Certificates / List",
  description: "Description for Get all certificates for a subscription.",
  category: "Certificates",
  inputs: {
    default: {
      config: {
        subscriptionId: {
          name: "Subscription ID",
          description:
            "Azure subscription ID (optional, falls back to app-level default if not provided)",
          type: "string",
          required: false,
        },
        $filter: {
          name: "Filter",
          description:
            "Return only information specified in the filter (using OData syntax). For example: $filter=KeyVaultId eq 'KeyVaultId'",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/subscriptions/${input.event.inputConfig.subscriptionId || input.app.config.subscriptionId}/providers/Microsoft.Web/certificates` +
          "?api-version=2024-11-01" +
          (input.event.inputConfig.$filter
            ? `&$filter=${input.event.inputConfig.$filter}`
            : "");

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
          value: {
            type: "array",
            items: {
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
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default Certificates_List;
