import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Blob_StartCopyFromURL: AppBlock = {
  name: "Blob / Start Copy From URL",
  description:
    "The Start Copy From URL operation copies a blob or an internet resource to a new blob.",
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
        x_ms_copy_source: {
          name: "Copy Source",
          description:
            "Specifies the name of the source page blob snapshot. This value is a URL of up to 2 KB in length that specifies a page blob snapshot. The value should be URL-encoded as it would appear in a request URI. The source blob must either be public or must be authenticated via a shared access signature.",
          type: "string",
          required: true,
        },
        timeout: {
          name: "Timeout",
          type: "number",
          required: false,
        },
        x_ms_meta: {
          name: "Meta",
          description:
            "Optional. Specifies a user-defined name-value pair associated with the blob. If no name-value pairs are specified, the operation will copy the metadata from the source blob or file to the destination blob. If one or more name-value pairs are specified, the destination blob is created with the specified metadata, and metadata is not copied from the source blob or file. Note that beginning with version 2009-09-19, metadata names must adhere to the naming rules for C# identifiers. See Naming and Referencing Containers, Blobs, and Metadata for more information.",
          type: "string",
          required: false,
        },
        x_ms_access_tier: {
          name: "Access Tier",
          description: "Optional. Indicates the tier to be set on the blob.",
          type: "string",
          required: false,
        },
        x_ms_rehydrate_priority: {
          name: "Rehydrate Priority",
          description:
            "Optional: Indicates the priority with which to rehydrate an archived blob.",
          type: "string",
          required: false,
        },
        x_ms_source_if_modified_since: {
          name: "Source If Modified Since",
          description:
            "Specify this header value to operate only on a blob if it has been modified since the specified date/time.",
          type: "string",
          required: false,
        },
        x_ms_source_if_unmodified_since: {
          name: "Source If Unmodified Since",
          description:
            "Specify this header value to operate only on a blob if it has not been modified since the specified date/time.",
          type: "string",
          required: false,
        },
        x_ms_source_if_match: {
          name: "Source If Match",
          description:
            "Specify an ETag value to operate only on blobs with a matching value.",
          type: "string",
          required: false,
        },
        x_ms_source_if_none_match: {
          name: "Source If None Match",
          description:
            "Specify an ETag value to operate only on blobs without a matching value.",
          type: "string",
          required: false,
        },
        x_ms_source_if_tags: {
          name: "Source If Tags",
          description:
            "Specify a SQL where clause on blob tags to operate only on blobs with a matching value.",
          type: "string",
          required: false,
        },
        If_Modified_Since: {
          name: "If Modified Since",
          description:
            "Specify this header value to operate only on a blob if it has been modified since the specified date/time.",
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
        If_Match: {
          name: "If Match",
          description:
            "Specify an ETag value to operate only on blobs with a matching value.",
          type: "string",
          required: false,
        },
        If_None_Match: {
          name: "If None Match",
          description:
            "Specify an ETag value to operate only on blobs without a matching value.",
          type: "string",
          required: false,
        },
        x_ms_if_tags: {
          name: "If Tags",
          description:
            "Specify a SQL where clause on blob tags to operate only on blobs with a matching value.",
          type: "string",
          required: false,
        },
        x_ms_lease_id: {
          name: "Lease ID",
          description:
            "If specified, the operation only succeeds if the resource's lease is active and matches this ID.",
          type: "string",
          required: false,
        },
        x_ms_client_request_id: {
          name: "Client Request ID",
          description:
            "Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled.",
          type: "string",
          required: false,
        },
        x_ms_tags: {
          name: "Tags",
          description:
            "Optional.  Used to set blob tags in various blob operations.",
          type: "string",
          required: false,
        },
        x_ms_seal_blob: {
          name: "Seal Blob",
          description:
            "Overrides the sealed state of the destination blob.  Service version 2019-12-12 and newer.",
          type: "boolean",
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
        x_ms_legal_hold: {
          name: "Legal Hold",
          description: "Specified if a legal hold should be set on the blob.",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.x_ms_meta) {
          additionalHeaders["x-ms-meta"] = String(
            input.event.inputConfig.x_ms_meta,
          );
        }
        if (input.event.inputConfig.x_ms_access_tier) {
          additionalHeaders["x-ms-access-tier"] = String(
            input.event.inputConfig.x_ms_access_tier,
          );
        }
        if (input.event.inputConfig.x_ms_rehydrate_priority) {
          additionalHeaders["x-ms-rehydrate-priority"] = String(
            input.event.inputConfig.x_ms_rehydrate_priority,
          );
        }
        if (input.event.inputConfig.x_ms_source_if_modified_since) {
          additionalHeaders["x-ms-source-if-modified-since"] = String(
            input.event.inputConfig.x_ms_source_if_modified_since,
          );
        }
        if (input.event.inputConfig.x_ms_source_if_unmodified_since) {
          additionalHeaders["x-ms-source-if-unmodified-since"] = String(
            input.event.inputConfig.x_ms_source_if_unmodified_since,
          );
        }
        if (input.event.inputConfig.x_ms_source_if_match) {
          additionalHeaders["x-ms-source-if-match"] = String(
            input.event.inputConfig.x_ms_source_if_match,
          );
        }
        if (input.event.inputConfig.x_ms_source_if_none_match) {
          additionalHeaders["x-ms-source-if-none-match"] = String(
            input.event.inputConfig.x_ms_source_if_none_match,
          );
        }
        if (input.event.inputConfig.x_ms_source_if_tags) {
          additionalHeaders["x-ms-source-if-tags"] = String(
            input.event.inputConfig.x_ms_source_if_tags,
          );
        }
        if (input.event.inputConfig.If_Modified_Since) {
          additionalHeaders["If-Modified-Since"] = String(
            input.event.inputConfig.If_Modified_Since,
          );
        }
        if (input.event.inputConfig.If_Unmodified_Since) {
          additionalHeaders["If-Unmodified-Since"] = String(
            input.event.inputConfig.If_Unmodified_Since,
          );
        }
        if (input.event.inputConfig.If_Match) {
          additionalHeaders["If-Match"] = String(
            input.event.inputConfig.If_Match,
          );
        }
        if (input.event.inputConfig.If_None_Match) {
          additionalHeaders["If-None-Match"] = String(
            input.event.inputConfig.If_None_Match,
          );
        }
        if (input.event.inputConfig.x_ms_if_tags) {
          additionalHeaders["x-ms-if-tags"] = String(
            input.event.inputConfig.x_ms_if_tags,
          );
        }
        if (input.event.inputConfig.x_ms_copy_source) {
          additionalHeaders["x-ms-copy-source"] = String(
            input.event.inputConfig.x_ms_copy_source,
          );
        }
        if (input.event.inputConfig.x_ms_lease_id) {
          additionalHeaders["x-ms-lease-id"] = String(
            input.event.inputConfig.x_ms_lease_id,
          );
        }
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }
        if (input.event.inputConfig.x_ms_tags) {
          additionalHeaders["x-ms-tags"] = String(
            input.event.inputConfig.x_ms_tags,
          );
        }
        if (input.event.inputConfig.x_ms_seal_blob) {
          additionalHeaders["x-ms-seal-blob"] = String(
            input.event.inputConfig.x_ms_seal_blob,
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
        if (input.event.inputConfig.x_ms_legal_hold) {
          additionalHeaders["x-ms-legal-hold"] = String(
            input.event.inputConfig.x_ms_legal_hold,
          );
        }

        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.containerName}/${input.event.inputConfig.blob}` +
          "?comp=copy" +
          (input.event.inputConfig.timeout
            ? `&timeout=${input.event.inputConfig.timeout}`
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

export default Blob_StartCopyFromURL;
