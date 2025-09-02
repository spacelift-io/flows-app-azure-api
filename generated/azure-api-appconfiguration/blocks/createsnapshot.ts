import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const CreateSnapshot: AppBlock = {
  name: "Create Snapshot",
  description: "Creates a key-value snapshot.",
  category: "General",
  inputs: {
    default: {
      config: {
        name: {
          name: "Name",
          description: "Name of the ",
          type: "string",
          required: true,
        },
        entity: {
          name: "Entity",
          description: "The key-value snapshot to create.",
          type: {
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
                type: "number",
              },
              size: {
                type: "number",
              },
              items_count: {
                type: "number",
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
          required: true,
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
        const requestBody = input.event.inputConfig.entity;
        const additionalHeaders: Record<string, string> = {};
        if (input.event.inputConfig.Sync_Token) {
          additionalHeaders["Sync-Token"] = String(
            input.event.inputConfig.Sync_Token,
          );
        }

        const url = `https://${input.event.inputConfig.storageAccount || input.app.config.storageAccount}.blob.core.windows.net/snapshots/${input.event.inputConfig.name}`;

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

export default CreateSnapshot;
