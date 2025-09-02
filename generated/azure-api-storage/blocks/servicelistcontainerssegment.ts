import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Service_ListContainersSegment: AppBlock = {
  name: "Service / List Containers Segment",
  description:
    "The List Containers Segment operation returns a list of the containers under the specified account",
  category: "Service",
  inputs: {
    default: {
      config: {
        prefix: {
          name: "Prefix",
          description:
            "Filters the results to return only containers whose name begins with the specified prefix.",
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
          "?comp=list" +
          (input.event.inputConfig.prefix
            ? `&prefix=${input.event.inputConfig.prefix}`
            : "") +
          (input.event.inputConfig.marker
            ? `&marker=${input.event.inputConfig.marker}`
            : "") +
          (input.event.inputConfig.maxresults
            ? `&maxresults=${input.event.inputConfig.maxresults}`
            : "") +
          (input.event.inputConfig.include
            ? `&include=${input.event.inputConfig.include}`
            : "") +
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
          ServiceEndpoint: {
            type: "string",
          },
          Prefix: {
            type: "string",
          },
          Marker: {
            type: "string",
          },
          MaxResults: {
            type: "integer",
          },
          ContainerItems: {
            type: "array",
            items: {
              type: "object",
              properties: {
                Name: {
                  type: "string",
                },
                Deleted: {
                  type: "boolean",
                },
                Version: {
                  type: "string",
                },
                Properties: {
                  type: "object",
                  properties: {
                    "Last-Modified": {
                      type: "string",
                    },
                    Etag: {
                      type: "string",
                    },
                    LeaseStatus: {
                      type: "string",
                    },
                    LeaseState: {
                      type: "string",
                    },
                    LeaseDuration: {
                      type: "string",
                    },
                    PublicAccess: {
                      type: "string",
                    },
                    HasImmutabilityPolicy: {
                      type: "boolean",
                    },
                    HasLegalHold: {
                      type: "boolean",
                    },
                    DefaultEncryptionScope: {
                      type: "string",
                    },
                    DenyEncryptionScopeOverride: {
                      type: "boolean",
                    },
                    DeletedTime: {
                      type: "string",
                    },
                    RemainingRetentionDays: {
                      type: "integer",
                    },
                    ImmutableStorageWithVersioningEnabled: {
                      type: "boolean",
                    },
                  },
                  required: ["Last-Modified", "Etag"],
                },
                Metadata: {
                  type: "object",
                  additionalProperties: true,
                },
              },
              required: ["Name", "Properties"],
            },
          },
          NextMarker: {
            type: "string",
          },
        },
        required: ["ServiceEndpoint", "ContainerItems"],
      },
    },
  },
};

export default Service_ListContainersSegment;
