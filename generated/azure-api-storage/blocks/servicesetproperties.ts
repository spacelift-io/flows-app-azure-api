import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Service_SetProperties: AppBlock = {
  name: "Service / Set Properties",
  description:
    "Sets properties for a storage account's Blob service endpoint, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules",
  category: "Service",
  inputs: {
    default: {
      config: {
        StorageServiceProperties: {
          name: "Storage Service Properties",
          description: "The StorageService properties.",
          type: {
            type: "object",
            properties: {
              Logging: {
                type: "object",
                properties: {
                  Version: {
                    type: "string",
                  },
                  Delete: {
                    type: "boolean",
                  },
                  Read: {
                    type: "boolean",
                  },
                  Write: {
                    type: "boolean",
                  },
                  RetentionPolicy: {
                    type: "object",
                    properties: {
                      Enabled: {
                        type: "boolean",
                      },
                      Days: {
                        type: "number",
                      },
                      AllowPermanentDelete: {
                        type: "boolean",
                      },
                    },
                    required: ["Enabled"],
                  },
                },
                required: [
                  "Version",
                  "Delete",
                  "Read",
                  "Write",
                  "RetentionPolicy",
                ],
              },
              HourMetrics: {
                type: "string",
              },
              MinuteMetrics: {
                type: "string",
              },
              Cors: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    AllowedOrigins: {
                      type: "string",
                    },
                    AllowedMethods: {
                      type: "string",
                    },
                    AllowedHeaders: {
                      type: "string",
                    },
                    ExposedHeaders: {
                      type: "string",
                    },
                    MaxAgeInSeconds: {
                      type: "number",
                    },
                  },
                  required: [
                    "AllowedOrigins",
                    "AllowedMethods",
                    "AllowedHeaders",
                    "ExposedHeaders",
                    "MaxAgeInSeconds",
                  ],
                },
              },
              DefaultServiceVersion: {
                type: "string",
              },
              DeleteRetentionPolicy: {
                type: "object",
                properties: {
                  Enabled: {
                    type: "boolean",
                  },
                  Days: {
                    type: "number",
                  },
                  AllowPermanentDelete: {
                    type: "boolean",
                  },
                },
                required: ["Enabled"],
              },
              StaticWebsite: {
                type: "object",
                properties: {
                  Enabled: {
                    type: "boolean",
                  },
                  IndexDocument: {
                    type: "string",
                  },
                  ErrorDocument404Path: {
                    type: "string",
                  },
                  DefaultIndexDocumentPath: {
                    type: "string",
                  },
                },
                required: ["Enabled"],
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
        x_ms_client_request_id: {
          name: "Client Request ID",
          description:
            "Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the analytics logs when storage analytics logging is enabled.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.StorageServiceProperties;
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.x_ms_client_request_id) {
          additionalHeaders["x-ms-client-request-id"] = String(
            input.event.inputConfig.x_ms_client_request_id,
          );
        }

        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/` +
          "?restype=service&comp=properties" +
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

export default Service_SetProperties;
