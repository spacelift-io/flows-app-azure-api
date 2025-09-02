import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PageBlob_UploadPagesFromURL: AppBlock = {
  name: "Page Blob / Upload Pages From URL",
  description:
    "The Upload Pages operation writes a range of pages to a page blob where the contents are read from a URL",
  category: "Page Blob",
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
          description: "Specify a URL to the copy source.",
          type: "string",
          required: true,
        },
        x_ms_source_range: {
          name: "Source Range",
          description:
            "Bytes of source data in the specified range. The length of this range should match the ContentLength header and x-ms-range/Range destination range header.",
          type: "string",
          required: true,
        },
        Content_Length: {
          name: "Content Length",
          description: "The length of the request.",
          type: "number",
          required: true,
        },
        x_ms_range: {
          name: "Range",
          description:
            "The range of bytes to which the source range would be written. The range should be 512 aligned and range-end is required.",
          type: "string",
          required: true,
        },
        x_ms_source_content_md5: {
          name: "Source Content MD5",
          description:
            "Specify the md5 calculated for the range of bytes that must be read from the copy source.",
          type: "string",
          required: false,
        },
        x_ms_source_content_crc64: {
          name: "Source Content CRC64",
          description:
            "Specify the crc64 calculated for the range of bytes that must be read from the copy source.",
          type: "string",
          required: false,
        },
        timeout: {
          name: "Timeout",
          type: "number",
          required: false,
        },
        x_ms_encryption_key: {
          name: "Encryption Key",
          description:
            "Optional. Specifies the encryption key to use to encrypt the data provided in the request. If not specified, encryption is performed with the root account encryption key.  For more information, see Encryption at Rest for Azure Storage Services.",
          type: "string",
          required: false,
        },
        x_ms_encryption_key_sha256: {
          name: "Encryption Key SHA256",
          description:
            "The SHA-256 hash of the provided encryption key. Must be provided if the x-ms-encryption-key header is provided.",
          type: "string",
          required: false,
        },
        x_ms_encryption_algorithm: {
          name: "Encryption Algorithm",
          description:
            'The algorithm used to produce the encryption key hash. Currently, the only accepted value is "AES256". Must be provided if the x-ms-encryption-key header is provided.',
          type: "string",
          required: false,
        },
        x_ms_encryption_scope: {
          name: "Encryption Scope",
          description:
            "Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to encrypt the data provided in the request. If not specified, encryption is performed with the default account encryption scope.  For more information, see Encryption at Rest for Azure Storage Services.",
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
        x_ms_if_sequence_number_le: {
          name: "If Sequence Number Le",
          description:
            "Specify this header value to operate only on a blob if it has a sequence number less than or equal to the specified.",
          type: "number",
          required: false,
        },
        x_ms_if_sequence_number_lt: {
          name: "If Sequence Number Lt",
          description:
            "Specify this header value to operate only on a blob if it has a sequence number less than the specified.",
          type: "number",
          required: false,
        },
        x_ms_if_sequence_number_eq: {
          name: "If Sequence Number Eq",
          description:
            "Specify this header value to operate only on a blob if it has the specified sequence number.",
          type: "number",
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
        x_ms_client_request_id: {
          name: "Client Request ID",
          description:
            "Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled.",
          type: "string",
          required: false,
        },
        x_ms_copy_source_authorization: {
          name: "Copy Source Authorization",
          description:
            "Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.",
          type: "string",
          required: false,
        },
        x_ms_file_request_intent: {
          name: "File Request Intent",
          description: "Valid value is backup",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const additionalHeaders: Record<string, string> = {};
        additionalHeaders["x-ms-page-write"] = "update";
        if (input.event.inputConfig.x_ms_copy_source) {
          additionalHeaders["x-ms-copy-source"] = String(
            input.event.inputConfig.x_ms_copy_source,
          );
        }
        if (input.event.inputConfig.x_ms_source_range) {
          additionalHeaders["x-ms-source-range"] = String(
            input.event.inputConfig.x_ms_source_range,
          );
        }
        if (input.event.inputConfig.x_ms_source_content_md5) {
          additionalHeaders["x-ms-source-content-md5"] = String(
            input.event.inputConfig.x_ms_source_content_md5,
          );
        }
        if (input.event.inputConfig.x_ms_source_content_crc64) {
          additionalHeaders["x-ms-source-content-crc64"] = String(
            input.event.inputConfig.x_ms_source_content_crc64,
          );
        }
        if (input.event.inputConfig.Content_Length) {
          additionalHeaders["Content-Length"] = String(
            input.event.inputConfig.Content_Length,
          );
        }
        if (input.event.inputConfig.x_ms_range) {
          additionalHeaders["x-ms-range"] = String(
            input.event.inputConfig.x_ms_range,
          );
        }
        if (input.event.inputConfig.x_ms_encryption_key) {
          additionalHeaders["x-ms-encryption-key"] = String(
            input.event.inputConfig.x_ms_encryption_key,
          );
        }
        if (input.event.inputConfig.x_ms_encryption_key_sha256) {
          additionalHeaders["x-ms-encryption-key-sha256"] = String(
            input.event.inputConfig.x_ms_encryption_key_sha256,
          );
        }
        if (input.event.inputConfig.x_ms_encryption_algorithm) {
          additionalHeaders["x-ms-encryption-algorithm"] = String(
            input.event.inputConfig.x_ms_encryption_algorithm,
          );
        }
        if (input.event.inputConfig.x_ms_encryption_scope) {
          additionalHeaders["x-ms-encryption-scope"] = String(
            input.event.inputConfig.x_ms_encryption_scope,
          );
        }
        if (input.event.inputConfig.x_ms_lease_id) {
          additionalHeaders["x-ms-lease-id"] = String(
            input.event.inputConfig.x_ms_lease_id,
          );
        }
        if (input.event.inputConfig.x_ms_if_sequence_number_le) {
          additionalHeaders["x-ms-if-sequence-number-le"] = String(
            input.event.inputConfig.x_ms_if_sequence_number_le,
          );
        }
        if (input.event.inputConfig.x_ms_if_sequence_number_lt) {
          additionalHeaders["x-ms-if-sequence-number-lt"] = String(
            input.event.inputConfig.x_ms_if_sequence_number_lt,
          );
        }
        if (input.event.inputConfig.x_ms_if_sequence_number_eq) {
          additionalHeaders["x-ms-if-sequence-number-eq"] = String(
            input.event.inputConfig.x_ms_if_sequence_number_eq,
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
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }
        if (input.event.inputConfig.x_ms_copy_source_authorization) {
          additionalHeaders["x-ms-copy-source-authorization"] = String(
            input.event.inputConfig.x_ms_copy_source_authorization,
          );
        }
        if (input.event.inputConfig.x_ms_file_request_intent) {
          additionalHeaders["x-ms-file-request-intent"] = String(
            input.event.inputConfig.x_ms_file_request_intent,
          );
        }

        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.containerName}/${input.event.inputConfig.blob}` +
          "?comp=page" +
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

export default PageBlob_UploadPagesFromURL;
