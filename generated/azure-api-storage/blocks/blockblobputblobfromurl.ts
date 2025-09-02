import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const BlockBlob_PutBlobFromUrl: AppBlock = {
  name: "Block Blob / Put Blob From Url",
  description:
    "The Put Blob from URL operation creates a new Block Blob where the contents of the blob are read from a given URL.  This API is supported beginning with the 2020-04-08 version. Partial updates are not supported with Put Blob from URL; the content of an existing blob is overwritten with the content of the new blob.  To perform partial updates to a block blob’s contents using a source URL, use the Put Block from URL API in conjunction with Put Block List.",
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
        Content_Length: {
          name: "Content Length",
          description: "The length of the request.",
          type: "number",
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
        Content_MD5: {
          name: "Content MD5",
          description:
            "Specify the transactional md5 for the body, to be validated by the service.",
          type: "string",
          required: false,
        },
        x_ms_blob_content_type: {
          name: "Blob Content Type",
          description:
            "Optional. Sets the blob's content type. If specified, this property is stored with the blob and returned with a read request.",
          type: "string",
          required: false,
        },
        x_ms_blob_content_encoding: {
          name: "Blob Content Encoding",
          description:
            "Optional. Sets the blob's content encoding. If specified, this property is stored with the blob and returned with a read request.",
          type: "string",
          required: false,
        },
        x_ms_blob_content_language: {
          name: "Blob Content Language",
          description:
            "Optional. Set the blob's content language. If specified, this property is stored with the blob and returned with a read request.",
          type: "string",
          required: false,
        },
        x_ms_blob_content_md5: {
          name: "Blob Content MD5",
          description:
            "Optional. An MD5 hash of the blob content. Note that this hash is not validated, as the hashes for the individual blocks were validated when each was uploaded.",
          type: "string",
          required: false,
        },
        x_ms_blob_cache_control: {
          name: "Blob Cache Control",
          description:
            "Optional. Sets the blob's cache control. If specified, this property is stored with the blob and returned with a read request.",
          type: "string",
          required: false,
        },
        x_ms_meta: {
          name: "Meta",
          description:
            "Optional. Specifies a user-defined name-value pair associated with the blob. If no name-value pairs are specified, the operation will copy the metadata from the source blob or file to the destination blob. If one or more name-value pairs are specified, the destination blob is created with the specified metadata, and metadata is not copied from the source blob or file. Note that beginning with version 2009-09-19, metadata names must adhere to the naming rules for C# identifiers. See Naming and Referencing Containers, Blobs, and Metadata for more information.",
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
        x_ms_blob_content_disposition: {
          name: "Blob Content Disposition",
          description: "Optional. Sets the blob's Content-Disposition header.",
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
        x_ms_access_tier: {
          name: "Access Tier",
          description: "Optional. Indicates the tier to be set on the blob.",
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
        x_ms_client_request_id: {
          name: "Client Request ID",
          description:
            "Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled.",
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
        x_ms_tags: {
          name: "Tags",
          description:
            "Optional.  Used to set blob tags in various blob operations.",
          type: "string",
          required: false,
        },
        x_ms_copy_source_blob_properties: {
          name: "Copy Source Blob Properties",
          description:
            "Optional, default is true.  Indicates if properties from the source blob should be copied.",
          type: "boolean",
          required: false,
        },
        x_ms_copy_source_authorization: {
          name: "Copy Source Authorization",
          description:
            "Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.",
          type: "string",
          required: false,
        },
        x_ms_copy_source_tag_option: {
          name: "Copy Source Tag Option",
          description:
            "Optional, default 'replace'.  Indicates if source tags should be copied or replaced with the tags specified by x-ms-tags.",
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
        additionalHeaders["x-ms-blob-type"] = "BlockBlob";
        if (input.event.inputConfig.Content_MD5) {
          additionalHeaders["Content-MD5"] = String(
            input.event.inputConfig.Content_MD5,
          );
        }
        if (input.event.inputConfig.Content_Length) {
          additionalHeaders["Content-Length"] = String(
            input.event.inputConfig.Content_Length,
          );
        }
        if (input.event.inputConfig.x_ms_blob_content_type) {
          additionalHeaders["x-ms-blob-content-type"] = String(
            input.event.inputConfig.x_ms_blob_content_type,
          );
        }
        if (input.event.inputConfig.x_ms_blob_content_encoding) {
          additionalHeaders["x-ms-blob-content-encoding"] = String(
            input.event.inputConfig.x_ms_blob_content_encoding,
          );
        }
        if (input.event.inputConfig.x_ms_blob_content_language) {
          additionalHeaders["x-ms-blob-content-language"] = String(
            input.event.inputConfig.x_ms_blob_content_language,
          );
        }
        if (input.event.inputConfig.x_ms_blob_content_md5) {
          additionalHeaders["x-ms-blob-content-md5"] = String(
            input.event.inputConfig.x_ms_blob_content_md5,
          );
        }
        if (input.event.inputConfig.x_ms_blob_cache_control) {
          additionalHeaders["x-ms-blob-cache-control"] = String(
            input.event.inputConfig.x_ms_blob_cache_control,
          );
        }
        if (input.event.inputConfig.x_ms_meta) {
          additionalHeaders["x-ms-meta"] = String(
            input.event.inputConfig.x_ms_meta,
          );
        }
        if (input.event.inputConfig.x_ms_lease_id) {
          additionalHeaders["x-ms-lease-id"] = String(
            input.event.inputConfig.x_ms_lease_id,
          );
        }
        if (input.event.inputConfig.x_ms_blob_content_disposition) {
          additionalHeaders["x-ms-blob-content-disposition"] = String(
            input.event.inputConfig.x_ms_blob_content_disposition,
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
        if (input.event.inputConfig.x_ms_access_tier) {
          additionalHeaders["x-ms-access-tier"] = String(
            input.event.inputConfig.x_ms_access_tier,
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
        if (input.event.inputConfig.x_ms_source_if_tags) {
          additionalHeaders["x-ms-source-if-tags"] = String(
            input.event.inputConfig.x_ms_source_if_tags,
          );
        }
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }
        if (input.event.inputConfig.x_ms_source_content_md5) {
          additionalHeaders["x-ms-source-content-md5"] = String(
            input.event.inputConfig.x_ms_source_content_md5,
          );
        }
        if (input.event.inputConfig.x_ms_tags) {
          additionalHeaders["x-ms-tags"] = String(
            input.event.inputConfig.x_ms_tags,
          );
        }
        if (input.event.inputConfig.x_ms_copy_source) {
          additionalHeaders["x-ms-copy-source"] = String(
            input.event.inputConfig.x_ms_copy_source,
          );
        }
        if (input.event.inputConfig.x_ms_copy_source_blob_properties) {
          additionalHeaders["x-ms-copy-source-blob-properties"] = String(
            input.event.inputConfig.x_ms_copy_source_blob_properties,
          );
        }
        if (input.event.inputConfig.x_ms_copy_source_authorization) {
          additionalHeaders["x-ms-copy-source-authorization"] = String(
            input.event.inputConfig.x_ms_copy_source_authorization,
          );
        }
        if (input.event.inputConfig.x_ms_copy_source_tag_option) {
          additionalHeaders["x-ms-copy-source-tag-option"] = String(
            input.event.inputConfig.x_ms_copy_source_tag_option,
          );
        }
        if (input.event.inputConfig.x_ms_file_request_intent) {
          additionalHeaders["x-ms-file-request-intent"] = String(
            input.event.inputConfig.x_ms_file_request_intent,
          );
        }

        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.containerName}/${input.event.inputConfig.blob}` +
          (input.event.inputConfig.timeout
            ? `?timeout=${input.event.inputConfig.timeout}`
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

export default BlockBlob_PutBlobFromUrl;
