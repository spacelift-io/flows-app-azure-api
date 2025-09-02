import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Blob_SetHTTPHeaders: AppBlock = {
  name: "Blob / Set HTTP Headers",
  description:
    "The Set HTTP Headers operation sets system properties on the blob",
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
        x_ms_blob_content_md5: {
          name: "Blob Content MD5",
          description:
            "Optional. An MD5 hash of the blob content. Note that this hash is not validated, as the hashes for the individual blocks were validated when each was uploaded.",
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
        x_ms_lease_id: {
          name: "Lease ID",
          description:
            "If specified, the operation only succeeds if the resource's lease is active and matches this ID.",
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
        x_ms_blob_content_disposition: {
          name: "Blob Content Disposition",
          description: "Optional. Sets the blob's Content-Disposition header.",
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
      },
      onEvent: async (input) => {
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
        if (input.event.inputConfig.x_ms_blob_content_md5) {
          additionalHeaders["x-ms-blob-content-md5"] = String(
            input.event.inputConfig.x_ms_blob_content_md5,
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
        if (input.event.inputConfig.x_ms_lease_id) {
          additionalHeaders["x-ms-lease-id"] = String(
            input.event.inputConfig.x_ms_lease_id,
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
        if (input.event.inputConfig.x_ms_blob_content_disposition) {
          additionalHeaders["x-ms-blob-content-disposition"] = String(
            input.event.inputConfig.x_ms_blob_content_disposition,
          );
        }
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }

        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.containerName}/${input.event.inputConfig.blob}` +
          "?comp=properties" +
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

export default Blob_SetHTTPHeaders;
