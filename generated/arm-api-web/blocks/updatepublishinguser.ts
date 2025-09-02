import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const UpdatePublishingUser: AppBlock = {
  name: "Update Publishing User",
  description: "Description for Updates publishing user",
  category: "General",
  inputs: {
    default: {
      config: {
        userDetails: {
          name: "User Details",
          description: "Details of publishing user",
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
          required: true,
        },
      },
      onEvent: async (input) => {
        const requestBody = input.event.inputConfig.userDetails;

        const url =
          `https://management.azure.com/providers/Microsoft.Web/publishingUsers/web` +
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

export default UpdatePublishingUser;
