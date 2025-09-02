import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const UpdateCertificateOperation: AppBlock = {
  name: "Update Certificate Operation",
  description:
    "Updates a certificate creation operation that is already in progress. This operation requires the certificates/update permission.",
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
        certificateOperation: {
          name: "Certificate Operation",
          description: "The certificate operation response.",
          type: {
            type: "object",
            properties: {
              cancellation_requested: {
                type: "boolean",
              },
            },
            required: ["cancellation_requested"],
          },
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.certificateOperation;

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/certificates/${input.event.inputConfig.certificate_name}/pending`;

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
          csr: {
            type: "string",
          },
          cancellation_requested: {
            type: "boolean",
          },
          status: {
            type: "string",
          },
          status_details: {
            type: "string",
          },
          error: {
            type: "object",
            properties: {
              code: {
                type: "string",
              },
              message: {
                type: "string",
              },
              innererror: {
                type: "object",
                properties: {
                  code: {
                    type: "object",
                    additionalProperties: true,
                  },
                  message: {
                    type: "object",
                    additionalProperties: true,
                  },
                  innererror: {
                    type: "object",
                    additionalProperties: true,
                  },
                },
              },
            },
          },
          target: {
            type: "string",
          },
          request_id: {
            type: "string",
          },
        },
      },
    },
  },
};

export default UpdateCertificateOperation;
