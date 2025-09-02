import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetSourceControl: AppBlock = {
  name: "Get Source Control",
  description: "Description for Gets source control token",
  category: "General",
  inputs: {
    default: {
      config: {
        sourceControlType: {
          name: "Source Control Type",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/providers/Microsoft.Web/sourcecontrols/${input.event.inputConfig.sourceControlType}` +
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

export default GetSourceControl;
