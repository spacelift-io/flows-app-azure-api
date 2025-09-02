import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Container_ListBlobFlatSegment: AppBlock = {
  name: "Container / List Blob Flat Segment",
  description:
    "[Update] The List Blobs operation returns a list of the blobs under the specified container",
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
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/${input.event.inputConfig.containerName}` +
          "?restype=container&comp=list" +
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
          ContainerName: {
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
          Segment: {
            type: "object",
            properties: {
              BlobItems: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    Name: {
                      type: "object",
                      properties: {
                        Encoded: {
                          type: "boolean",
                        },
                        content: {
                          type: "string",
                        },
                      },
                    },
                    Deleted: {
                      type: "boolean",
                    },
                    Snapshot: {
                      type: "string",
                    },
                    VersionId: {
                      type: "string",
                    },
                    IsCurrentVersion: {
                      type: "boolean",
                    },
                    Properties: {
                      type: "object",
                      properties: {
                        "Creation-Time": {
                          type: "string",
                        },
                        "Last-Modified": {
                          type: "string",
                        },
                        Etag: {
                          type: "string",
                        },
                        "Content-Length": {
                          type: "integer",
                        },
                        "Content-Type": {
                          type: "string",
                        },
                        "Content-Encoding": {
                          type: "string",
                        },
                        "Content-Language": {
                          type: "string",
                        },
                        "Content-MD5": {
                          type: "string",
                        },
                        "Content-Disposition": {
                          type: "string",
                        },
                        "Cache-Control": {
                          type: "string",
                        },
                        "x-ms-blob-sequence-number": {
                          type: "integer",
                        },
                        BlobType: {
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
                        CopyId: {
                          type: "string",
                        },
                        CopyStatus: {
                          type: "string",
                        },
                        CopySource: {
                          type: "string",
                        },
                        CopyProgress: {
                          type: "string",
                        },
                        CopyCompletionTime: {
                          type: "string",
                        },
                        CopyStatusDescription: {
                          type: "string",
                        },
                        ServerEncrypted: {
                          type: "boolean",
                        },
                        IncrementalCopy: {
                          type: "boolean",
                        },
                        DestinationSnapshot: {
                          type: "string",
                        },
                        DeletedTime: {
                          type: "string",
                        },
                        RemainingRetentionDays: {
                          type: "integer",
                        },
                        AccessTier: {
                          type: "string",
                        },
                        AccessTierInferred: {
                          type: "boolean",
                        },
                        ArchiveStatus: {
                          type: "string",
                        },
                        CustomerProvidedKeySha256: {
                          type: "string",
                        },
                        EncryptionScope: {
                          type: "string",
                        },
                        AccessTierChangeTime: {
                          type: "string",
                        },
                        TagCount: {
                          type: "integer",
                        },
                        "Expiry-Time": {
                          type: "string",
                        },
                        Sealed: {
                          type: "boolean",
                        },
                        RehydratePriority: {
                          type: "string",
                        },
                        LastAccessTime: {
                          type: "string",
                        },
                        ImmutabilityPolicyUntilDate: {
                          type: "string",
                        },
                        ImmutabilityPolicyMode: {
                          type: "string",
                        },
                        LegalHold: {
                          type: "boolean",
                        },
                      },
                      required: ["Etag", "Last-Modified"],
                    },
                    Metadata: {
                      type: "object",
                      properties: {
                        Encrypted: {
                          type: "string",
                        },
                      },
                      additionalProperties: true,
                    },
                    BlobTags: {
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
                    ObjectReplicationMetadata: {
                      type: "object",
                      additionalProperties: true,
                    },
                    HasVersionsOnly: {
                      type: "boolean",
                    },
                  },
                  required: ["Name", "Deleted", "Snapshot", "Properties"],
                },
              },
            },
            required: ["BlobItems"],
          },
          NextMarker: {
            type: "string",
          },
        },
        required: ["ServiceEndpoint", "ContainerName", "Segment"],
      },
    },
  },
};

export default Container_ListBlobFlatSegment;
