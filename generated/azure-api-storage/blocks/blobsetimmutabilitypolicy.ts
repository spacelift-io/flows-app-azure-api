import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Blob_SetImmutabilityPolicy: AppBlock = {
  name: "Blob / Set Immutability Policy",
  description:
    "The Set Immutability Policy operation sets the immutability policy on the blob",
  category: "Blob",
  inputs: {
    default: {
      config: {
        containerName: {
          name: "Container Name",
          description: "Name of the container",
          type: "string",
          required: true,
        },
        blob: {
          name: "Blob",
          type: "string",
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
        If_Unmodified_Since: {
          name: "If Unmodified Since",
          description:
            "Specify this header value to operate only on a blob if it has not been modified since the specified date/time.",
          type: "string",
          required: false,
        },
        x_ms_immutability_policy_until_date: {
          name: "Immutability Policy Until Date",
          description:
            "Specifies the date time when the blobs immutability policy is set to expire.",
          type: "string",
          required: false,
        },
        x_ms_immutability_policy_mode: {
          name: "Immutability Policy Mode",
          description:
            "Specifies the immutability policy mode to set on the blob.",
          type: "string",
          required: false,
        },
        snapshot: {
          name: "Snapshot",
          type: "string",
          required: false,
        },
        versionid: {
          name: "Versionid",
          description: "Unique identifier",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }
        if (input.event.inputConfig.If_Unmodified_Since) {
          additionalHeaders["If-Unmodified-Since"] = String(
            input.event.inputConfig.If_Unmodified_Since,
          );
        }
        if (input.event.inputConfig.x_ms_immutability_policy_until_date) {
          additionalHeaders["x-ms-immutability-policy-until-date"] = String(
            input.event.inputConfig.x_ms_immutability_policy_until_date,
          );
        }
        if (input.event.inputConfig.x_ms_immutability_policy_mode) {
          additionalHeaders["x-ms-immutability-policy-mode"] = String(
            input.event.inputConfig.x_ms_immutability_policy_mode,
          );
        }

        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.containerName}/${input.event.inputConfig.blob}` +
          "?comp=immutabilityPolicies" +
          (input.event.inputConfig.timeout
            ? `&timeout=${input.event.inputConfig.timeout}`
            : "") +
          (input.event.inputConfig.snapshot
            ? `&snapshot=${input.event.inputConfig.snapshot}`
            : "") +
          (input.event.inputConfig.versionid
            ? `&versionid=${input.event.inputConfig.versionid}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
          undefined,
          additionalHeaders,
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
        additionalProperties: true,
      },
    },
  },
};

export default Blob_SetImmutabilityPolicy;
