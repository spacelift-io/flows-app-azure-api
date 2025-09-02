import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetCertificateIssuers: AppBlock = {
  name: "Get Certificate Issuers",
  description:
    "The GetCertificateIssuers operation returns the set of certificate issuer resources in the specified key vault. This operation requires the certificates/manageissuers/getissuers permission.",
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
      },
      onEvent: async (input) => {
        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.vault.azure.net/certificates/issuers` +
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
                provider: {
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

export default GetCertificateIssuers;
