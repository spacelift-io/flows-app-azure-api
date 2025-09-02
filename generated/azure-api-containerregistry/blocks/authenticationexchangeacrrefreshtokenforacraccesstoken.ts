import { AppBlock, events } from "@slflows/sdk/v1";
import { makeAzureRequest } from "../utils/azureRequest";

const Authentication_ExchangeAcrRefreshTokenForAcrAccessToken: AppBlock = {
  name: "Authentication / Exchange Acr Refresh Token For Acr Access Token",
  description: "Exchange ACR Refresh token for an ACR Access Token",
  category: "Authentication",
  inputs: {
    default: {
      config: {},
      onEvent: async (input) => {
        const url = `https://${input.event.inputConfig.url || input.app.config.registryLoginUri}/oauth2/token`;

        const result = await makeAzureRequest(
          input,
          url,
          "POST",
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

export default Authentication_ExchangeAcrRefreshTokenForAcrAccessToken;
