import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Service_GetStatistics: AppBlock = {
  name: "Service / Get Statistics",
  description:
    "Retrieves statistics related to replication for the Blob service. It is only available on the secondary location endpoint when read-access geo-redundant replication is enabled for the storage account.",
  category: "Service",
  inputs: {
    default: {
      config: {
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
      },
      onEvent: async (input) => {
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }

        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/` +
          "?restype=service&comp=stats" +
          (input.event.inputConfig.timeout
            ? `&timeout=${input.event.inputConfig.timeout}`
            : "");

        const result = await makeAzureRequest(
          input,
          url,
          "GET",
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
        properties: {
          GeoReplication: {
            type: "object",
            properties: {
              Status: {
                type: "string",
              },
              LastSyncTime: {
                type: "string",
              },
            },
            required: ["Status", "LastSyncTime"],
          },
        },
      },
    },
  },
};

export default Service_GetStatistics;
