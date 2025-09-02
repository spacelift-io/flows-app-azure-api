import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Authentication_GetAcrAccessTokenFromLogin: AppBlock = {
  name: "Authentication / Get Acr Access Token From Login",
  description: "Exchange Username, Password and Scope for an ACR Access Token",
  category: "Authentication",
  inputs: {
    default: {
      config: {
        service: {
          name: "Service",
          description: "Indicates the name of your Azure container registry.",
          type: "string",
          required: true,
        },
        scope: {
          name: "Scope",
          description:
            "Expected to be a valid scope, and can be specified more than once for multiple scope requests. You can obtain this from the Www-Authenticate response header from the challenge.",
          type: "string",
          required: true,
        },
      },
      onEvent: async (input) => {
        const url =
          `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/oauth2/token` +
          (input.event.inputConfig.service
            ? `?service=${input.event.inputConfig.service}`
            : "") +
          (input.event.inputConfig.scope
            ? `&scope=${input.event.inputConfig.scope}`
            : "");

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
          access_token: {
            type: "string",
          },
        },
      },
    },
  },
};

export default Authentication_GetAcrAccessTokenFromLogin;
