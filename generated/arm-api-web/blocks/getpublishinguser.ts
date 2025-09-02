import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const GetPublishingUser: AppBlock = {
  name: "Get Publishing User",
  description: "Description for Gets publishing user",
  category: "General",
  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const url =
          `https://management.azure.com/providers/Microsoft.Web/publishingUsers/web` +
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
              publishingUserName: {
                type: "string",
              },
              publishingPassword: {
                type: "string",
              },
              publishingPasswordHash: {
                type: "string",
              },
              publishingPasswordHashSalt: {
                type: "string",
              },
              scmUri: {
                type: "string",
              },
            },
            required: ["publishingUserName"],
          },
        },
      },
    },
  },
};

export default GetPublishingUser;
