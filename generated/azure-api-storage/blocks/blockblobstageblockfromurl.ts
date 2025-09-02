import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const BlockBlob_StageBlockFromURL: AppBlock = {
  name: "Block Blob / Stage Block From URL",
  description:
    "The Stage Block operation creates a new block to be committed as part of a blob where the contents are read from a URL.",
  category: "Block Blob",
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
        blockid: {
          name: "Blockid",
          description: "Unique identifier",
          type: "string",
          required: true,
        },
        Content_Length: {
          name: "Content Length",
          description: "The length of the request.",
          type: "number",
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
          description: "Bytes of source data in the specified range.",
          type: "string",
          required: false,
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
        if (input.event.inputConfig.Content_Length) {
          additionalHeaders["Content-Length"] = String(
            input.event.inputConfig.Content_Length,
          );
        }
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
          "?comp=block" +
          (input.event.inputConfig.blockid
            ? `&blockid=${input.event.inputConfig.blockid}`
            : "") +
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

export default BlockBlob_StageBlockFromURL;
