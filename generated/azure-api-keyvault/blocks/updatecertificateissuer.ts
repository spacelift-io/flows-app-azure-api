import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const UpdateCertificateIssuer: AppBlock = {
  name: "Update Certificate Issuer",
  description:
    "The UpdateCertificateIssuer operation performs an update on the specified certificate issuer entity. This operation requires the certificates/setissuers permission.",
  category: "General",
  inputs: {
    default: {
      config: {
        issuer_name: {
          name: "Issuer Name",
          description: "Name of the issuer-",
          type: "string",
          required: true,
        },
        parameter: {
          name: "Parameter",
          description: "Request parameters",
          type: {
            type: "object",
            properties: {
              provider: {
                type: "string",
              },
              credentials: {
                type: "object",
                properties: {
                  account_id: {
                    type: "string",
                  },
                  pwd: {
                    type: "string",
                  },
                },
              },
              org_details: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                  },
                  admin_details: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        first_name: {
                          type: "string",
                        },
                        last_name: {
                          type: "string",
                        },
                        email: {
                          type: "string",
                        },
                        phone: {
                          type: "string",
                        },
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
                  created: {
                    type: "number",
                  },
                  updated: {
                    type: "number",
                  },
                },
              },
            },
          },
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.parameter;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/certificates/issuers/${input.event.inputConfig.issuer_name}`;

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
          id: {
            type: "string",
          },
          provider: {
            type: "string",
          },
          credentials: {
            type: "object",
            properties: {
              account_id: {
                type: "string",
              },
              pwd: {
                type: "string",
              },
            },
          },
          org_details: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              admin_details: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    first_name: {
                      type: "string",
                    },
                    last_name: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    phone: {
                      type: "string",
                    },
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
              created: {
                type: "integer",
              },
              updated: {
                type: "integer",
              },
            },
          },
        },
      },
    },
  },
};

export default UpdateCertificateIssuer;
