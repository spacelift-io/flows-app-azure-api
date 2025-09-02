import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const BlockBlob_CommitBlockList: AppBlock = {
  name: "Block Blob / Commit Block List",
  description:
    "The Commit Block List operation writes a blob by specifying the list of block IDs that make up the blob. In order to be written as part of a blob, a block must have been successfully written to the server in a prior Put Block operation. You can call Put Block List to update a blob by uploading only those blocks that have changed, then committing the new and existing blocks together. You can do this by specifying whether to commit a block from the committed block list or from the uncommitted block list, or to commit the most recently uploaded version of the block, whichever list it may belong to.",
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
        blocks: {
          name: "Blocks",
          description: "Blob Blocks.",
          type: {
            type: "object",
            properties: {
              Committed: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              Uncommitted: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              Latest: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
          required: true,
        },
        timeout: {
          name: "Timeout",
          type: "number",
          required: false,
        },
        x_ms_blob_cache_control: {
          name: "Blob Cache Control",
          description:
            "Optional. Sets the blob's cache control. If specified, this property is stored with the blob and returned with a read request.",
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
        const requestBody = input.event.inputConfig.blocks;
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.x_ms_blob_cache_control) {
          additionalHeaders["x-ms-blob-cache-control"] = String(
            input.event.inputConfig.x_ms_blob_cache_control,
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
          "?comp=blocklist" +
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

export default BlockBlob_CommitBlockList;
