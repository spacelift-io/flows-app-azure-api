import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Service_GetUserDelegationKey: AppBlock = {
  name: "Service / Get User Delegation Key",
  description:
    "Retrieves a user delegation key for the Blob service. This is only a valid operation when using bearer token authentication.",
  category: "Service",
  inputs: {
    default: {
      config: {
        KeyInfo: {
          name: "Key Info",
          description: "Key information",
          type: {
            type: "object",
            properties: {
              Start: {
                type: "string",
              },
              Expiry: {
                type: "string",
              },
            },
            required: ["Start", "Expiry"],
          },
          required: true,
        },
        timeout: {
          name: "Timeout",
          type: "number",
          required: false,
        },
        x_ms_client_request_id: {
          name: "Client Request ID",
          description:
            "Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.KeyInfo;
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }

        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/` +
          "?restype=service&comp=userdelegationkey" +
          (input.event.inputConfig.timeout
            ? `&timeout=${input.event.inputConfig.timeout}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
          requestBody,
          additionalHeaders,
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
          SignedOid: {
            type: "string",
          },
          SignedTid: {
            type: "string",
          },
          SignedStart: {
            type: "string",
          },
          SignedExpiry: {
            type: "string",
          },
          SignedService: {
            type: "string",
          },
          SignedVersion: {
            type: "string",
          },
          Value: {
            type: "string",
          },
        },
        required: [
          "SignedOid",
          "SignedTid",
          "SignedStart",
          "SignedExpiry",
          "SignedService",
          "SignedVersion",
          "Value",
        ],
      },
    },
  },
};

export default Service_GetUserDelegationKey;
