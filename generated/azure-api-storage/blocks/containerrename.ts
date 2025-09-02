import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Container_Rename: AppBlock = {
  name: "Container / Rename",
  description: "Renames an existing container.",
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
        x_ms_source_container_name: {
          name: "Source Container Name",
          description:
            "Required.  Specifies the name of the container to rename.",
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
        x_ms_source_lease_id: {
          name: "Source Lease ID",
          description:
            "A lease ID for the source path. If specified, the source path must have an active lease and the lease ID must match.",
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
        if (input.event.inputConfig.x_ms_source_container_name) {
          additionalHeaders["x-ms-source-container-name"] = String(
            input.event.inputConfig.x_ms_source_container_name,
          );
        }
        if (input.event.inputConfig.x_ms_source_lease_id) {
          additionalHeaders["x-ms-source-lease-id"] = String(
            input.event.inputConfig.x_ms_source_lease_id,
          );
        }

        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.containerName}` +
          "?restype=container&comp=rename" +
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

export default Container_Rename;
