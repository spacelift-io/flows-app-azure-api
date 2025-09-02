import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CreateCertificate: AppBlock = {
  name: "Create Certificate",
  description:
    "If this is the first version, the certificate resource is created. This operation requires the certificates/create permission.",
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
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              policy: {
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
                        type: "number",
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
                        type: "number",
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
                              type: "number",
                            },
                            days_before_expiry: {
                              type: "number",
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
                        type: "number",
                      },
                      exp: {
                        type: "number",
                      },
                      created: {
                        type: "number",
                      },
                      updated: {
                        type: "number",
                      },
                      recoverableDays: {
                        type: "number",
                      },
                      recoveryLevel: {
                        type: "string",
                      },
                    },
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
                    type: "number",
                  },
                  exp: {
                    type: "number",
                  },
                  created: {
                    type: "number",
                  },
                  updated: {
                    type: "number",
                  },
                  recoverableDays: {
                    type: "number",
                  },
                  recoveryLevel: {
                    type: "string",
                  },
                },
              },
              tags: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/certificates/${input.event.inputConfig.certificate_name}/create`;

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

export default CreateCertificate;
