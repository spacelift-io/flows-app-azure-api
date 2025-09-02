import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetSnapshots: AppBlock = {
  name: "Get Snapshots",
  description: "Gets a list of key-value snapshots.",
  category: "General",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "A filter for the name of the returned snapshots.",
          type: "string",
          required: false,
        },
        After: {
          name: "After",
          description:
            "Instructs the server to return elements that appear after the element referred to by the specified token.",
          type: "string",
          required: false,
        },
        $Select: {
          name: "Select",
          description:
            "Used to select what fields are present in the returned resource(s).",
          type: {
            type: "array",
          },
          required: false,
        },
        status: {
          name: "Status",
          description:
            "Used to filter returned snapshots by their status property.",
          type: {
            type: "array",
          },
          required: false,
        },
        Sync_Token: {
          name: "Sync Token",
          description:
            "Used to guarantee real-time consistency between requests.",
          type: "string",
          required: false,
        },
      },
      onEvent: async (input) => {
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.Sync_Token) {
          additionalHeaders["Sync-Token"] = String(
            input.event.inputConfig.Sync_Token,
          );
        }

        const url =
          `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/snapshots` +
          (input.event.inputConfig.name
            ? `?name=${input.event.inputConfig.name}`
            : "") +
          (input.event.inputConfig.After
            ? `&After=${input.event.inputConfig.After}`
            : "") +
          (input.event.inputConfig.$Select
            ? `&$Select=${input.event.inputConfig.$Select}`
            : "") +
          (input.event.inputConfig.status
            ? `&status=${input.event.inputConfig.status}`
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
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                status: {
                  type: "string",
                },
                filters: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      key: {
                        type: "string",
                      },
                      label: {
                        type: "string",
                      },
                      tags: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                    },
                    required: ["key"],
                  },
                },
                composition_type: {
                  type: "string",
                },
                created: {
                  type: "string",
                },
                expires: {
                  type: "string",
                },
                retention_period: {
                  type: "integer",
                },
                size: {
                  type: "integer",
                },
                items_count: {
                  type: "integer",
                },
                tags: {
                  type: "object",
                  additionalProperties: true,
                },
                etag: {
                  type: "string",
                },
              },
              required: ["name", "filters"],
            },
          },
          "@nextLink": {
            type: "string",
          },
        },
      },
    },
  },
};

export default GetSnapshots;
