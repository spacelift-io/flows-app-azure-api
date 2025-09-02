import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const UpdateSourceControl: AppBlock = {
  name: "Update Source Control",
  description: "Description for Updates source control token",
  category: "General",
  inputs: {
    default: {
      config: {
        sourceControlType: {
          name: "Source Control Type",
          type: "string",
          required: true,
        },
        requestMessage: {
          name: "Request Message",
          description: "Source control token information",
          type: {
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
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.requestMessage;

        const url =
          `https://management.azure.com/providers/Microsoft.Web/sourcecontrols/${input.event.inputConfig.sourceControlType}` +
          "?api-version=2024-11-01";

        const result = await makeAzureRequest(
          input,
          url,
          "PUT",
          requestBody,
          undefined,
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
  },
};

export default UpdateSourceControl;
