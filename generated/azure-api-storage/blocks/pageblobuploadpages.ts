import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const PageBlob_UploadPages: AppBlock = {
  name: "Page Blob / Upload Pages",
  description:
    "The Upload Pages operation writes a range of pages to a page blob",
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
        body: {
          name: "Body",
          description: "Request body content",
          type: "string",
          required: true,
        },
        Content_Length: {
          name: "Content Length",
          description: "The length of the request.",
          type: "number",
          required: true,
        },
        Content_MD5: {
          name: "Content MD5",
          description:
            "Specify the transactional md5 for the body, to be validated by the service.",
          type: "string",
          required: false,
        },
        x_ms_content_crc64: {
          name: "Content CRC64",
          description:
            "Specify the transactional crc64 for the body, to be validated by the service.",
          type: "string",
          required: false,
        },
        timeout: {
          name: "Timeout",
          type: "number",
          required: false,
        },
        x_ms_range: {
          name: "Range",
          description:
            "Return only the bytes of the blob in the specified range.",
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
        x_ms_client_request_id: {
          name: "Client Request ID",
          description:
            "Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled.",
          type: "string",
          required: false,
        },
        x_ms_structured_body: {
          name: "Structured Body",
          description:
            "Required if the request body is a structured message. Specifies the message schema version and properties.",
          type: "string",
          required: false,
        },
        x_ms_structured_content_length: {
          name: "Structured Content Length",
          description:
            "Required if the request body is a structured message. Specifies the length of the blob/file content inside the message body. Will always be smaller than Content-Length.",
          type: "number",
          required: false,
        },
        isBinaryData: {
          name: "Is Binary Data",
          description:
            "Whether the body contains binary data (base64-encoded) or text content",
          type: "boolean",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.body;
        const additionalHeaders: Record<string, string> = {};
        additionalHeaders["x-ms-page-write"] = "update";
        if (input.event.inputConfig.Content_Length) {
          additionalHeaders["Content-Length"] = String(
            input.event.inputConfig.Content_Length,
          );
        }
        if (input.event.inputConfig.Content_MD5) {
          additionalHeaders["Content-MD5"] = String(
            input.event.inputConfig.Content_MD5,
          );
        }
        if (input.event.inputConfig.x_ms_content_crc64) {
          additionalHeaders["x-ms-content-crc64"] = String(
            input.event.inputConfig.x_ms_content_crc64,
          );
        }
        if (input.event.inputConfig.x_ms_range) {
          additionalHeaders["x-ms-range"] = String(
            input.event.inputConfig.x_ms_range,
          );
        }
        if (input.event.inputConfig.x_ms_lease_id) {
          additionalHeaders["x-ms-lease-id"] = String(
            input.event.inputConfig.x_ms_lease_id,
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
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }
        if (input.event.inputConfig.x_ms_structured_body) {
          additionalHeaders["x-ms-structured-body"] = String(
            input.event.inputConfig.x_ms_structured_body,
          );
        }
        if (input.event.inputConfig.x_ms_structured_content_length) {
          additionalHeaders["x-ms-structured-content-length"] = String(
            input.event.inputConfig.x_ms_structured_content_length,
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
        additionalProperties: true,
      },
    },
  },
};

export default PageBlob_UploadPages;
