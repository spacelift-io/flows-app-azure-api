import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Container_Restore: AppBlock = {
  name: "Container / Restore",
  description: "Restores a previously-deleted container.",
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
        x_ms_client_request_id: {
          name: "Client Request ID",
          description:
            "Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled.",
          type: "string",
          required: false,
        },
        x_ms_deleted_container_name: {
          name: "Deleted Container Name",
          description:
            "Optional.  Version 2019-12-12 and later.  Specifies the name of the deleted container to restore.",
          type: "string",
          required: false,
        },
        x_ms_deleted_container_version: {
          name: "Deleted Container Version",
          description:
            "Optional.  Version 2019-12-12 and later.  Specifies the version of the deleted container to restore.",
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
        if (input.event.inputConfig.x_ms_deleted_container_name) {
          additionalHeaders["x-ms-deleted-container-name"] = String(
            input.event.inputConfig.x_ms_deleted_container_name,
          );
        }
        if (input.event.inputConfig.x_ms_deleted_container_version) {
          additionalHeaders["x-ms-deleted-container-version"] = String(
            input.event.inputConfig.x_ms_deleted_container_version,
          );
        }

        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.containerName}` +
          "?restype=container&comp=undelete" +
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

export default Container_Restore;
