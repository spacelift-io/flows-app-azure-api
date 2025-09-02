import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Container_Create: AppBlock = {
  name: "Container / Create",
  description:
    "creates a new container under the specified account. If the container with the same name already exists, the operation fails",
  category: "Container",
  inputs: {
    default: {
      config: {
        containerName: {
          name: "Container Name",
          description: "Name of the container",
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
        x_ms_blob_public_access: {
          name: "Blob Public Access",
          description:
            "Specifies whether data in the container may be accessed publicly and the level of access",
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
        x_ms_default_encryption_scope: {
          name: "Default Encryption Scope",
          description:
            "Optional.  Version 2019-07-07 and later.  Specifies the default encryption scope to set on the container and use for all future writes.",
          type: "string",
          required: false,
        },
        x_ms_deny_encryption_scope_override: {
          name: "Deny Encryption Scope Override",
          description:
            "Optional.  Version 2019-07-07 and newer.  If true, prevents any request from specifying a different encryption scope than the scope set on the container.",
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
        if (input.event.inputConfig.x_ms_blob_public_access) {
          additionalHeaders["x-ms-blob-public-access"] = String(
            input.event.inputConfig.x_ms_blob_public_access,
          );
        }
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }
        if (input.event.inputConfig.x_ms_default_encryption_scope) {
          additionalHeaders["x-ms-default-encryption-scope"] = String(
            input.event.inputConfig.x_ms_default_encryption_scope,
          );
        }
        if (input.event.inputConfig.x_ms_deny_encryption_scope_override) {
          additionalHeaders["x-ms-deny-encryption-scope-override"] = String(
            input.event.inputConfig.x_ms_deny_encryption_scope_override,
          );
        }

        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.containerName}` +
          "?restype=container" +
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

export default Container_Create;
