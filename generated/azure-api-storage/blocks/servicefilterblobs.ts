import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Service_FilterBlobs: AppBlock = {
  name: "Service / Filter Blobs",
  description:
    "The Filter Blobs operation enables callers to list blobs across all containers whose tags match a given search expression.  Filter blobs searches across all containers within a storage account but can be scoped within the expression to a single container.",
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
        where: {
          name: "Where",
          description:
            "Filters the results to return only to return only blobs whose tags match the specified expression.",
          type: "string",
          required: false,
        },
        marker: {
          name: "Marker",
          type: "string",
          required: false,
        },
        maxresults: {
          name: "Max Results",
          description:
            "Specifies the maximum number of containers to return. If the request does not specify maxresults, or specifies a value greater than 5000, the server will return up to 5000 items. Note that if the listing operation crosses a partition boundary, then the service will return a continuation token for retrieving the remainder of the results. For this reason, it is possible that the service will return fewer results than specified by maxresults, or than the default of 5000.",
          type: "number",
          required: false,
        },
        include: {
          name: "Include",
          type: {
            type: "array",
          },
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
          "?comp=blobs" +
          (input.event.inputConfig.timeout
            ? `&timeout=${input.event.inputConfig.timeout}`
            : "") +
          (input.event.inputConfig.where
            ? `&where=${input.event.inputConfig.where}`
            : "") +
          (input.event.inputConfig.marker
            ? `&marker=${input.event.inputConfig.marker}`
            : "") +
          (input.event.inputConfig.maxresults
            ? `&maxresults=${input.event.inputConfig.maxresults}`
            : "") +
          (input.event.inputConfig.include
            ? `&include=${input.event.inputConfig.include}`
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
          ServiceEndpoint: {
            type: "string",
          },
          Where: {
            type: "string",
          },
          Blobs: {
            type: "array",
            items: {
              type: "object",
              properties: {
                Name: {
                  type: "string",
                },
                ContainerName: {
                  type: "string",
                },
                Tags: {
                  type: "object",
                  properties: {
                    BlobTagSet: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          Key: {
                            type: "string",
                          },
                          Value: {
                            type: "string",
                          },
                        },
                        required: ["Key", "Value"],
                      },
                    },
                  },
                  required: ["BlobTagSet"],
                },
                VersionId: {
                  type: "string",
                },
                IsCurrentVersion: {
                  type: "boolean",
                },
              },
              required: ["Name", "ContainerName"],
            },
          },
          NextMarker: {
            type: "string",
          },
        },
        required: ["ServiceEndpoint", "Where", "Blobs"],
      },
    },
  },
};

export default Service_FilterBlobs;
