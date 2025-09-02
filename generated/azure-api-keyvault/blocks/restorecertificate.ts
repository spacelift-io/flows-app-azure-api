import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const RestoreCertificate: AppBlock = {
  name: "Restore Certificate",
  description:
    "Restores a backed up certificate, and all its versions, to a vault. This operation requires the certificates/restore permission.",
  category: "General",
  inputs: {
    default: {
      config: {
        parameters: {
          name: "Parameters",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              value: {
                type: "string",
              },
            },
            required: ["value"],
          },
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameters;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/certificates/restore`;

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
          id: {
            type: "string",
          },
          kid: {
            type: "string",
          },
          sid: {
            type: "string",
          },
          x5t: {
            type: "string",
          },
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
          cer: {
            type: "string",
          },
          contentType: {
            type: "string",
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
          tags: {
            type: "object",
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export default RestoreCertificate;
