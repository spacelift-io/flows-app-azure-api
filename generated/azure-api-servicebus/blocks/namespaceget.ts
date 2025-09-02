import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Namespace_Get: AppBlock = {
  name: "Namespace / Get",
  description: "Get the details about the Service Bus namespace.",
  category: "Namespace",
  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const url = `${input.event.inputConfig.endpoint || input.app.config.endpoint}/$namespaceinfo`;

        const result = await makeAzureRequest(
          input,
          url,
          "GET",
          undefined,
          undefined,
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
          id: {
            type: "string",
          },
          title: {
            type: "object",
          },
          updated: {
            type: "string",
          },
          author: {
            type: "object",
            properties: {
              name: {
                type: "string",
              },
            },
          },
          link: {
            type: "object",
            properties: {
              href: {
                type: "string",
              },
              rel: {
                type: "string",
              },
            },
          },
          content: {
            type: "object",
            properties: {
              type: {
                type: "string",
              },
              NamespaceProperties: {
                type: "object",
                properties: {
                  alias: {
                    type: "string",
                  },
                  createdTime: {
                    type: "string",
                  },
                  messagingSku: {
                    type: "string",
                  },
                  messagingUnits: {
                    type: "integer",
                  },
                  modifiedTime: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                  namespaceType: {
                    type: "string",
                  },
                },
              },
            },
            required: ["type", "NamespaceProperties"],
          },
        },
        required: ["title"],
      },
    },
  },
};

export default Namespace_Get;
