import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const ListSourceControls: AppBlock = {
  name: "List Source Controls",
  description:
    "Description for Gets the source controls available for Azure websites.",
  category: "General",
  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/providers/Microsoft.Web/sourcecontrols` +
          "?api-version=2024-11-01";

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
          value: {
            type: "array",
            items: {
              type: "object",
              properties: {
                properties: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                    },
                    tokenSecret: {
                      type: "string",
                    },
                    refreshToken: {
                      type: "string",
                    },
                    expirationTime: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          nextLink: {
            type: "string",
          },
        },
        required: ["value"],
      },
    },
  },
};

export default ListSourceControls;
