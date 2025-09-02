import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetCertificates: AppBlock = {
  name: "Get Certificates",
  description:
    "The GetCertificates operation returns the set of certificates resources in the specified key vault. This operation requires the certificates/list permission.",
  category: "General",
  inputs: {
    default: {
      config: {
        maxresults: {
          name: "Max Results",
          description:
            "Maximum number of results to return in a page. If not specified the service will return up to 25 results.",
          type: "number",
          required: false,
        },
        includePending: {
          name: "Include Pending",
          description:
            "Specifies whether to include certificates which are not completely provisioned.",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/certificates` +
          (input.event.inputConfig.maxresults
            ? `?maxresults=${input.event.inputConfig.maxresults}`
            : "") +
          (input.event.inputConfig.includePending
            ? `&includePending=${input.event.inputConfig.includePending}`
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

export default GetCertificates;
