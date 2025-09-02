import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetCertificateVersions: AppBlock = {
  name: "Get Certificate Versions",
  description:
    "The GetCertificateVersions operation returns the versions of a certificate in the specified key vault. This operation requires the certificates/list permission.",
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
        maxresults: {
          name: "Max Results",
          description:
            "Maximum number of results to return in a page. If not specified the service will return up to 25 results.",
          type: "number",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/certificates/${input.event.inputConfig.certificate_name}/versions` +
          (input.event.inputConfig.maxresults
            ? `?maxresults=${input.event.inputConfig.maxresults}`
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
                id: {
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
                x5t: {
                  type: "string",
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
      },
    },
  },
};

export default GetCertificateVersions;
