import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetCertificatePolicy: AppBlock = {
  name: "Get Certificate Policy",
  description:
    "The GetCertificatePolicy operation returns the specified certificate policy resources in the specified key vault. This operation requires the certificates/get permission.",
  category: "General",
  inputs: {
    default: {
      config: {
        certificate_name: {
          name: "Certificate Name",
          description: "Name of the certificate-",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/certificates/${input.event.inputConfig.certificate_name}/policy`;

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
          key_props: {
            type: "object",
            properties: {
              exportable: {
                type: "boolean",
              },
              kty: {
                type: "string",
              },
              key_size: {
                type: "integer",
              },
              reuse_key: {
                type: "boolean",
              },
              crv: {
                type: "string",
              },
            },
          },
          secret_props: {
            type: "object",
            properties: {
              contentType: {
                type: "string",
              },
            },
          },
          x509_props: {
            type: "object",
            properties: {
              subject: {
                type: "string",
              },
              ekus: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              sans: {
                type: "object",
                properties: {
                  emails: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  dns_names: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  upns: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
              key_usage: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              validity_months: {
                type: "integer",
              },
            },
          },
          lifetime_actions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                trigger: {
                  type: "object",
                  properties: {
                    lifetime_percentage: {
                      type: "integer",
                    },
                    days_before_expiry: {
                      type: "integer",
                    },
                  },
                },
                action: {
                  type: "object",
                  properties: {
                    action_type: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          issuer: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
              cty: {
                type: "string",
              },
              cert_transparency: {
                type: "boolean",
              },
            },
          },
          attributes: {
            type: "object",
            properties: {
              enabled: {
                type: "boolean",
              },
              nbf: {
                type: "integer",
              },
              exp: {
                type: "integer",
              },
              created: {
                type: "integer",
              },
              updated: {
                type: "integer",
              },
              recoverableDays: {
                type: "integer",
              },
              recoveryLevel: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};

export default GetCertificatePolicy;
