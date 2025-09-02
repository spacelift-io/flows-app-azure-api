import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetCertificateIssuer: AppBlock = {
  name: "Get Certificate Issuer",
  description:
    "The GetCertificateIssuer operation returns the specified certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission.",
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
      },
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/certificates/issuers/${input.event.inputConfig.issuer_name}`;

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

export default GetCertificateIssuer;
